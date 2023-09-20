const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const productSchema = new Schema({
  name: String,
  price: Number,
  color: String,
});

productSchema.post("save", MongooseError);

const Product = model("product", productSchema);

module.exports = Product;
