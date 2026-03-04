import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/cart/${user._id}`
      );

      const data = await result.json();
      setCartItems(data);

    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    });

    fetchCart();
  };

  // TOTAL PRICE CALCULATION
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (item.product?.price || 0) * item.quantity,
    0
  );

  // NAVIGATE TO PAYMENT PAGE
  const goToPayment = () => {
    navigate("/payment", {
      state: { amount: totalPrice }
    });
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cartItems.length > 0 ? (
          <div className="cart-content">

            {/* LEFT SIDE - ITEMS */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">

                  <div>
                    <h4>{item.product?.name}</h4>
                    <p>Price: ₹ {item.product?.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            {/* RIGHT SIDE - SUMMARY */}
            <div className="cart-summary">

              <h3>Summary</h3>

              <p>Total Items: {cartItems.length}</p>

              <h2>Total: ₹ {totalPrice}</h2>

              <button
                className="checkout-btn"
                onClick={goToPayment}
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        ) : (
          <div className="empty-cart-container">

            <div className="empty-icon">🛒</div>

            <h3>Your Cart is Empty</h3>

            <p>Add some products to see them here.</p>

            <button
              className="shop-btn"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;