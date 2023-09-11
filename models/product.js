const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const productSchema = new Schema({
  name: String,
  price: Number,
  color: String,
  isLiked: {
    type: Boolean,
    default: false,
  },
});

productSchema.post("save", MongooseError);

const Product = model("product", productSchema);

module.exports = { Product };
