const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const Cookies = require("cookies");

const getCart = async (req, res) => {
  const cookies = new Cookies(req, res);

  const cart = cookies.get("cart");

  if (!cart) {
    res.json(null);
  } else {
    res.json(JSON.parse(decodeURIComponent(cart)));
  }
};

const addToCart = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  const cookies = new Cookies(req, res);

  let cart = cookies.get("cart");

  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(decodeURIComponent(cart));
  }

  // const excistingProduct = cart.find((item) => item._id === product._id);
  // if (excistingProduct) {
  //   // add quantity
  // }
  cart.push(product);
  cart = encodeURIComponent(JSON.stringify(cart));
  cookies.set("cart", cart);
  res.json(cart);
};

module.exports = {
  getCart: controllerWrap(getCart),
  addToCart: controllerWrap(addToCart),
};
