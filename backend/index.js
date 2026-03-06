const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Order = require("./db/Order");
const Category = require("./db/Category");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Cart = require("./db/Cart");
const Payment = require("./db/Payment");

const app = express();
const jwtKey = "e-com";

app.use(express.json());
app.use(cors());

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend running fine ✅");
});

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    result = result.toObject();
    delete result.password;

    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) return res.status(500).json({ message: "JWT error" });
      res.json({ result, auth: token });
    });
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json({ result: "No User found" });
  }

  const user = await User.findOne(req.body).select("-password");
  if (!user) return res.json({ result: "No User found" });

  jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) return res.status(500).json({ message: "JWT error" });
    res.json({ user, auth: token });
  });
});

/* ================= ADD PRODUCT ================= */
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Product add failed" });
  }
});

/* ================= GET PRODUCTS ================= */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ================= DELETE PRODUCT ================= */
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.json(result);
});

/* ================= GET PRODUCT BY ID ================= */
app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  res.json(result || { result: "No Record Found" });
});

/* ================= UPDATE PRODUCT ================= */
app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(result);
});

/* ================= SEARCH ================= */
app.get("/search/:key", async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } }
    ]
  });
  res.json(result);
});

/* ================= ADD TO CART ================= */
app.post("/cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    const cartItem = new Cart(req.body);
    const result = await cartItem.save();
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Add to cart failed" });
  }
});

/* ================= GET CART ================= */
app.get("/cart/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });

    const detailedCart = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          _id: item._id,
          quantity: item.quantity,
          product
        };
      })
    );

    res.json(detailedCart);

  } catch (err) {
    res.status(500).json({ message: "Fetch cart failed" });
  }
});

/* ================= REMOVE FROM CART ================= */
app.delete("/cart/:id", async (req, res) => {
  const result = await Cart.deleteOne({ _id: req.params.id });
  res.json(result);
});

/* ================= DASHBOARD STATS ================= */
app.get("/dashboard-stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Cart.countDocuments();

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      pendingDeliveries: 0
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

/* ================= MAKE PAYMENT ================= */
app.post("/payment", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const result = await payment.save();

    res.json({
      message: "Payment successful",
      result
    });

  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
});

/* ================= GET PAYMENTS ================= */
app.get("/payments/:userId", async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Fetch payment failed" });
  }
});
/* ================= CREATE ORDER ================= */
app.post("/create-order", async (req, res) => {
  try {

    const { userId, paymentId, totalAmount } = req.body;

    const cartItems = await Cart.find({ userId });

    const orderItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      paymentId
    });

    const result = await order.save();

    // clear cart after order
    await Cart.deleteMany({ userId });

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});
/* ================= GET USER ORDERS ================= */
app.get("/orders/:userId", async (req, res) => {

  const orders = await Order.find({ userId: req.params.userId });

  res.json(orders);

});
/* ================= ADD CATEGORY ================= */
app.post("/add-category", async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Category creation failed" });
  }
});

/* ================= GET ALL CATEGORIES ================= */
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({ status: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Fetch categories failed" });
  }
});

/* ================= GET CATEGORY BY ID ================= */
app.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Fetch category failed" });
  }
});

/* ================= UPDATE CATEGORY ================= */
app.put("/category/:id", async (req, res) => {
  try {
    const result = await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          category_name: req.body.category_name,
          description: req.body.description,
          updated_at: Date.now()
        }
      }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Category update failed" });
  }
});

/* ================= DEACTIVATE CATEGORY ================= */
app.put("/category/deactivate/:id", async (req, res) => {
  try {
    const result = await Category.updateOne(
      { _id: req.params.id },
      { $set: { status: false } }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Category deactivate failed" });
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});