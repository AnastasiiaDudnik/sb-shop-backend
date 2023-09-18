const express = require("express");
const router = express.Router();

const {
  getShoppingCart,
  addToShoppingCart,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/", getShoppingCart);
router.post("/:id", addToShoppingCart);
router.delete("/:id", removeFromCart);

module.exports = router;
