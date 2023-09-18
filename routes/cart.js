const express = require("express");
const router = express.Router();

const {
  getShoppingCart,
  addToShoppingCart,
  clearCart,
} = require("../controllers/cartController");

router.get("/", getShoppingCart);
router.post("/:id", addToShoppingCart);
router.delete("/:id", clearCart);

module.exports = router;
