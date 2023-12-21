const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product", // Reference to the product model
  },
  quantity: Number,
});

const shoppingCartSchema = new Schema({
  items: [cartItemSchema], // Array of cart items
});

shoppingCartSchema.post("save", MongooseError);

const Cart = model("cart", shoppingCartSchema);

module.exports = { Cart };
