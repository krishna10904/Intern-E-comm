const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: String,
  orderId: String,
  amount: Number,
  status: {
    type: String,
    default: "Pending"
  },
  method: {
    type: String,
    default: "Online"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("payments", paymentSchema);