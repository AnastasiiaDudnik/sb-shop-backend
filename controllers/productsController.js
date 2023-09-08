const { Product } = require("../models/product");

const getAllProducts = async (req, res) => {
  const result = await Product.find({});
  res.json(result);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);

  res.json(result);
};

module.exports = {
  getAllProducts,
  getOneProduct,
};
