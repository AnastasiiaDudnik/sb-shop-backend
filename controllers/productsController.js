const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { controllerWrap } = require("../decorators/controllerWrap");

const getAllProducts = async (req, res) => {
  const { id: sessionId } = req.session;
  res.cookie("guest", sessionId, {
    domain: "https://anastasiiadudnik.github.io/shop-test/",
  });
  // console.log(sessionId);

  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Product.find({}, null, { skip, limit });

  res.json(result);
  console.log(res);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  // const { id: sessionId } = req.session;

  // const { guest } = req.cookies;
  // console.log(guest);

  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  // res.cookie("guestID", sessionId, { maxAge: 30 * 24 * 60 * 60 * 1000 }); //store for 30 days

  const recentlyViewed = req.session.recentlyViewed || [];

  // Check if the product is already in the recently viewed list
  const index = recentlyViewed.findIndex(
    (product) => product._id.toString() === id
  );

  //  If the product is not in the list, add it
  if (index === -1) {
    recentlyViewed.push(result);
  }

  res.json({ result, recentlyViewed });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  // const { guest } = req.cookie;
  const result = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Product with id "${id}" not found`);
  }

  // res.cookie("favorites", result, {
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  // }); // 30 days in milliseconds

  res.json(result);
};

const getRevetlyViewed = async (req, res) => {
  // console.log(req.session);
  const { recentlyViewed } = req.session.recentlyViewed;
  res.json(recentlyViewed);
};

module.exports = {
  getAllProducts: controllerWrap(getAllProducts),
  getOneProduct: controllerWrap(getOneProduct),
  updateFavorite: controllerWrap(updateFavorite),
  getRevetlyViewed: controllerWrap(getRevetlyViewed),
};
