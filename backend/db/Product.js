const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    // Old category text (kept so your current UI doesn't break)
    category: {
        type: String,
        required: true
    },

    // New category reference for category module
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: null
    },

    company: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("products", productSchema);