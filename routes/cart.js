const express = require("express");
const router = express.Router();

const { getShoppingCart } = require("../controllers/cartController");

router.get("/", getShoppingCart);

module.exports = router;
