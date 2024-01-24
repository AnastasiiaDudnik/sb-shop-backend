const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

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

  console.log(product);

  const cookieHeaders = req.headers.cookie;
  const cookies = cookieHeaders.split(";");

  const cookieObjects = cookies.map((cookieString) => {
    const [key, value] = cookieString.trim().split("=");
    return { key, value };
  });

  // console.log(cookieObjects);

  const cartCookie = cookieObjects.find(({ key }) => key === "cart");
  console.log(cartCookie);

  let cart = [];

  if (cartCookie) {
    cart = JSON.parse(cartCookie.value);
    console.log(cart);
  }

  cart.push(product);

  res.cookie("cart", JSON.stringify(cart));
  res.json(cart);
};

module.exports = {
  getCart: controllerWrap(getCart),
  addToCart: controllerWrap(addToCart),
};
