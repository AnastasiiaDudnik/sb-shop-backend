const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const Cookies = require("cookies");

const getCart = async (req, res) => {
  const cookieHeaders = req.headers.cookie;
  const cookies = cookieHeaders.split(";");

  const cookieObjects = cookies.map((cookieString) => {
    const [key, value] = cookieString.trim().split("=");
    return { key, value };
  });

  const cart = cookieObjects.find(({ key }) => key === "cart");

  if (!cart) {
    res.json(null);
  } else {
    res.json(cart.value);
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

  cart.push(product);
  cart = encodeURIComponent(JSON.stringify(cart));
  cookies.set("cart", cart);
  res.json(cart);
};

module.exports = {
  getCart: controllerWrap(getCart),
  addToCart: controllerWrap(addToCart),
};
