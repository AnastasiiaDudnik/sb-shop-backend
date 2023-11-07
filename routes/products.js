const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  // setCookie,
  getOneProduct,
  updateFavorite,
  getRevetlyViewed,
} = require("../controllers/productsController");

const { isValidId } = require("../middlewares/isValidId");

router.get("/", getAllProducts);
// router.get("/cookies", setCookie);
router.get("/viewed", getRevetlyViewed);
router.get("/:id", isValidId, getOneProduct);
router.patch("/:id", isValidId, updateFavorite);

module.exports = router;
