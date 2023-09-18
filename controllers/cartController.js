const { Cart } = require("../models/cart");
const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const getShoppingCart = async (req, res) => {
  // const { sessionId } = req.sessions;
  // const cartItems = await Cart.find({ sessionId });
  // let totalPrice = 0;
  // for (const item of cartItems) {
  //   totalPrice += item.price * item.quantity;
  // }
  // res.json({ cartItems, totalPrice });
  // res.json(result);
};

const addToShoppingCart = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with ${id} not found`);
  }

  console.log(product);
  const result = await Cart.create({ items: product });
  res.status(201).json(result);
};

module.exports = {
  getShoppingCart: controllerWrap(getShoppingCart),
  addToShoppingCart: controllerWrap(addToShoppingCart),
};
