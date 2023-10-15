const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    name: String
});

module.exports = mongoose.model("categories, categoriesSchema");