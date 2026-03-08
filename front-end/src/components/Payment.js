import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

function Payment() {

  const location = useLocation();
  const totalAmount = location.state?.amount || 0;

  const [amount, setAmount] = useState(totalAmount);
  const [method, setMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  const makePayment = async () => {

    if (!amount || amount <= 0) {
      setMessage("❌ Please enter a valid amount");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const orderId = "ORDER_" + Date.now();

    // 1️⃣ SAVE PAYMENT
    let paymentResult = await fetch("https://intern-e-comm1.onrender.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        orderId,
        amount,
        method
      })
    });

    paymentResult = await paymentResult.json();

    if (paymentResult) {

      // 2️⃣ CREATE ORDER AFTER PAYMENT
      await fetch("https://intern-e-comm1.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          paymentId: paymentResult._id,
          totalAmount: amount
        })
      });

      setMessage("✅ Payment Successful & Order Created!");
    }
  };

  return (
    <div className="payment-page">

      <div className="payment-card">

        <h1>Checkout</h1>

        <div className="amount-box">
          <label>Total Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="method-box">
          <label>Select Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Card">Credit / Debit Card</option>
            <option value="NetBanking">Net Banking</option>
          </select>
        </div>

        <button className="pay-btn" onClick={makePayment}>
          Pay ₹ {amount}
        </button>

        {message && (
          <p className="payment-message">{message}</p>
        )}

      </div>

    </div>
  );
}

export default Payment;