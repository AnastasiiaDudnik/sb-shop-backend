const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const getAllProducts = async (req, res) => {
  const { id } = req.session;

  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const products = await Product.find({}, null, { skip, limit });

  const cookieHeaders = req.headers.cookie;
  const cookies = cookieHeaders.split(";");

  for (const cookie of cookies) {
    const [key] = cookie.split("=");

    if (key !== "guest") {
      res.cookie("guest", id, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      if (!res.getHeader("set-cookie")) {
        res.send({ message: "Cookies not set" });
      }
    }
  }

  res.json(products);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;

  const cookieHeaders = req.headers.cookie;
  const cookies = cookieHeaders.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");

    console.log(`Key: ${key}, Value: ${value}`);
  }

  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  res.json({ result });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Product with id "${id}" not found`);
  }

  res.json(result);
};

const getRevetlyViewed = async (req, res) => {
  const { recentlyViewed } = req.session.recentlyViewed;
  res.json(recentlyViewed);
};

module.exports = {
  getAllProducts: controllerWrap(getAllProducts),
  getOneProduct: controllerWrap(getOneProduct),
  updateFavorite: controllerWrap(updateFavorite),
  getRevetlyViewed: controllerWrap(getRevetlyViewed),
};
