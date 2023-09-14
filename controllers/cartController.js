const { Cart } = require("../models/cart");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const getShoppingCart = async (req, res) => {
  const { sessionId } = req.sessions;
  const cartItems = await Cart.find({ sessionId });

  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price * item.quantity;
  }

  res.json({ cartItems, totalPrice });
  res.json(result);
};

module.exports = {
  getShoppingCart: controllerWrap(getShoppingCart),
};
