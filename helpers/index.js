const HttpError = require("./HttpError");
const MongooseError = require("./mongooseError");
const { addRecentlyViewedProducts } = require("./recentlyViewed");
const { getRecentlyViewedProducts } = require("./recentlyViewed");

module.exports = {
  HttpError,
  MongooseError,
  addRecentlyViewedProducts,
  getRecentlyViewedProducts,
};
