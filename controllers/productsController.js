const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const Cookies = require("cookies");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const products = await Product.find({}, null, { skip, limit });

  res.json(products);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;

  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  const cookies = new Cookies(req, res);

  cookies.set("viewed", id, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
    // secure: true,  // uncomment when https
    sameSite: "None",
  });

  res.json(result);
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

const getRecetlyViewed = async (req, res) => {
  const cookies = new Cookies(req, res);

  const isViewed = cookies.get("viewed");

  if (isViewed) {
    const result = await Product.findById(isViewed);

    res.json(result);
  }
};

module.exports = {
  getAllProducts: controllerWrap(getAllProducts),
  getOneProduct: controllerWrap(getOneProduct),
  updateFavorite: controllerWrap(updateFavorite),
  getRecetlyViewed: controllerWrap(getRecetlyViewed),
};
