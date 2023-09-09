const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getOneProduct,
  updateFavorite,
} = require("../controllers/productsController");

const { isValidId } = require("../middlewares/isValidId");

router.get("/", getAllProducts);
router.get("/:id", isValidId, getOneProduct);
router.patch("/:id", isValidId, updateFavorite);

module.exports = router;
