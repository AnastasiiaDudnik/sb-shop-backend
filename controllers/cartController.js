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
  }
};
const addToCart = async (req, res) => {};

module.exports = {
  getCart: controllerWrap(getCart),
};
