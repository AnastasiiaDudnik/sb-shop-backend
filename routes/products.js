const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getOneProduct,
} = require("../controllers/productsController");

const { isValidId } = require("../middlewares/isValidId");

router.get("/", getAllProducts);
router.get("/:id", isValidId, getOneProduct);

module.exports = router;
