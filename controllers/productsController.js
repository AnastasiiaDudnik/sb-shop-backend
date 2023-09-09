const { Product } = require("../models/product");
const { HttpError } = require("../helpers");
const { ControllerWrap } = require("../decorators/controllerWrap");

const getAllProducts = async (req, res) => {
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

  res.json(result);
};

module.exports = {
  getAllProducts: ControllerWrap(getAllProducts),
  getOneProduct: ControllerWrap(getOneProduct),
};
