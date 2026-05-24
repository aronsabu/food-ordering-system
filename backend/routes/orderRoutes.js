const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const adminOnly =
  require("../middleware/adminMiddleware");


const {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

// Place Order
router.post(
  "/",
  verifyToken,
  placeOrder
);

// View User Orders
router.get(
  "/",
  verifyToken,
  getUserOrders
);

router.get(
  "/admin/all",
  verifyToken,
  adminOnly,
  getAllOrders
);

// View Single Order Details
router.get(
  "/:id",
  verifyToken,
  getOrderDetails
);

router.put(
  "/:id/status",
  verifyToken,
  adminOnly,
  updateOrderStatus
);

module.exports = router;