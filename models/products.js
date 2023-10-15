const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
});

const Product = mongoose.model("Product", productScheme);

module.exports = Product