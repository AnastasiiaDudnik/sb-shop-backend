const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getOneProduct,
  updateFavorite,
  getRecetlyViewed,
} = require("../controllers/productsController");

const { isValidId } = require("../middlewares/isValidId");

router.get("/", getAllProducts);
router.get("/viewed", getRecetlyViewed);
router.get("/:id", isValidId, getOneProduct);
router.patch("/:id", isValidId, updateFavorite);

module.exports = router;
