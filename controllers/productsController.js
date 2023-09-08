const { Product } = require("../models/product");
const { HttpError } = require("../helpers");

const getAllProducts = async (req, res) => {
  const result = await Product.find({});
  res.json(result);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  res.json(result);
};

module.exports = {
  getAllProducts,
  getOneProduct,
};
