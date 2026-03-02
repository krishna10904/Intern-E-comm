import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await fetch("http://localhost:5000/cart", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token"))
        }
      });

      const data = await result.json();
      setCartItems(data);

    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE"
    });

    fetchCart();
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">

      <div className="cart-container">

        <h2>Your Cart</h2>

        {cartItems.length > 0 ? (
          <div className="cart-content">

            {/* Left Side - Items */}
            <div className="cart-items">

              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ₹ {item.price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
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

            {/* Right Side - Summary */}
            <div className="cart-summary">
              <h3>Summary</h3>
              <p>Total Items: {cartItems.length}</p>
              <h2>Total: ₹ {totalPrice}</h2>

              <button className="checkout-btn">
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
    onClick={() => window.location.href = "/products"}
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