const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

let recentlyViewed = [];

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const filter = {};
  const { favorites } = req.cookies;

  if (favorites) {
    filter.isLiked = favorites === "true";
  }

  const result = await Product.find(filter, null, { skip, limit });

  res.json(result);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  if (
    !recentlyViewed.some((viewedProduct) =>
      viewedProduct._id.equals(result._id)
    )
  ) {
    recentlyViewed.push(result);
  }
  res.cookie("recentlyViewed", recentlyViewed, { maxAge: 86400000 }); // 1 day in milliseconds
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
  const { recentlyViewed } = req.cookies;
  res.json(recentlyViewed);
};

module.exports = {
  getAllProducts: controllerWrap(getAllProducts),
  getOneProduct: controllerWrap(getOneProduct),
  updateFavorite: controllerWrap(updateFavorite),
  getRevetlyViewed: controllerWrap(getRevetlyViewed),
};
