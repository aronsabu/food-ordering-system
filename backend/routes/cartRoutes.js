const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const {
  addToCart,
  viewCart,
  removeCartItem,
  updateCartQuantity,
} = require("../controllers/cartController");

router.post(
  "/",
  verifyToken,
  addToCart
);

router.get(
  "/",
  verifyToken,
  viewCart
);

router.delete(
  "/:id",
  verifyToken,
  removeCartItem
);

router.put(
  "/:id",
  verifyToken,
  updateCartQuantity
);

module.exports = router;