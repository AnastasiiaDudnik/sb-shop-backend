const { Cart } = require("../models/cart");
const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const getShoppingCart = async (req, res) => {
  const result = await Cart.find({});
  res.json(result);
};

const addToShoppingCart = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with ${id} not found`);
  }

  const result = await Cart.create({ items: product });
  res.status(201).json(result);
};

const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with ${id} not found`);
  }

  const result = await Cart.findByIdAndRemove(product._id);

  res.json({
    message: "product deleted",
    result,
  });
};

module.exports = {
  getShoppingCart: controllerWrap(getShoppingCart),
  addToShoppingCart: controllerWrap(addToShoppingCart),
  removeFromCart: controllerWrap(removeFromCart),
};
