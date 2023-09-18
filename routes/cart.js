const express = require("express");
const router = express.Router();

const {
  getShoppingCart,
  addToShoppingCart,
} = require("../controllers/cartController");

router.get("/", getShoppingCart);
router.post("/:id", addToShoppingCart);

module.exports = router;
