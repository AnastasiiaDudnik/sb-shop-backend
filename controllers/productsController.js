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
  const cookieToFind = "guest";

  const result = cookies.find((item) => item.startsWith(cookieToFind));

  if (!result) {
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

  res.json(products);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;

  const cookieHeaders = req.headers.cookie;
  const cookies = cookieHeaders.split(";");

  for (const cookie of cookies) {
    console.log(cookie);
  }

  const result = await Product.findById(id);

  if (!result) {
    throw HttpError(404, `Product with "${id}" not found`);
  }

  // const recentlyViewed = req.session.recentlyViewed || [];

  // // Check if the product is already in the recently viewed list
  // const index = recentlyViewed.findIndex(
  //   (product) => product._id.toString() === id
  // );

  // //  If the product is not in the list, add it
  // if (index === -1) {
  //   recentlyViewed.push(result);
  // }

  res.json({ result });
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
  // setCookie: controllerWrap(setCookie),
  getOneProduct: controllerWrap(getOneProduct),
  updateFavorite: controllerWrap(updateFavorite),
  getRevetlyViewed: controllerWrap(getRevetlyViewed),
};
