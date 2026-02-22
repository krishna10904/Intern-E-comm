const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

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

    jwt.sign(
      { result },
      jwtKey,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "JWT error" });
        }
        res.json({ result, auth: token });
      }
    );
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

  if (!user) {
    return res.json({ result: "No User found" });
  }

  jwt.sign(
    { user },
    jwtKey,
    { expiresIn: "2h" },
    (err, token) => {
      if (err) {
        return res.status(500).json({ message: "JWT error" });
      }
      res.json({ user, auth: token });
    }
  );
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

/* ================= START SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
