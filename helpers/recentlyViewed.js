const base = [];

const addRecentlyViewedProducts = (id, productId) => {
  const { recentlyViewedProducts } = req;
  const result = recentlyViewedProducts.push(productId);
  console.log(`Product ${productId} viewed by guest with ID ${id}`);
  return result;
};

const getRecentlyViewedProducts = (id) => {
  // const { recentlyViewedProducts } = req;
  // return recentlyViewedProducts;
  return base;
};

module.exports = { getRecentlyViewedProducts, addRecentlyViewedProducts };
