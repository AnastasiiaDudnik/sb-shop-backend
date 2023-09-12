const nanoid = require("nanoid");
const { Product } = require("../models/product");
const { HttpError } = require("../helpers");
const { ControllerWrap } = require("../decorators/controllerWrap");

let recentlyViewed = [];

const getAllProducts = async (req, res) => {
  const sessionId = nanoid();
  req.sessions.sessionId = sessionId;

  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Product.find({}, null, { skip, limit });
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

  res.json({ result, message: "Product added to recently viewed" });
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
  res.json(recentlyViewed);
};

module.exports = {
  getAllProducts: ControllerWrap(getAllProducts),
  getOneProduct: ControllerWrap(getOneProduct),
  updateFavorite: ControllerWrap(updateFavorite),
  getRevetlyViewed: ControllerWrap(getRevetlyViewed),
};
