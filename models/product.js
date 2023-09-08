const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  color: String,
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const Product = model("product", productSchema);

module.exports = { Product };
