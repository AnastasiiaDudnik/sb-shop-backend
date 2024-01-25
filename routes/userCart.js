const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  deleteOneFromCart,
} = require("../controllers/cartController");

router.get("/", getCart);
router.post("/:id", addToCart);
router.delete("/:id", deleteOneFromCart);

module.exports = router;
