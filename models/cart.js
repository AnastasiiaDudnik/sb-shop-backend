const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");

const cartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", // Reference to the product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const shoppingCartSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [cartItemSchema], // Array of cart items
});

shoppingCartSchema.post("save", MongooseError);

const Cart = model("cart", shoppingCartSchema);

module.exports = { Cart };
