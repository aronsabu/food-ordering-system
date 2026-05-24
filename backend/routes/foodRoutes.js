const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const adminOnly =
  require("../middleware/adminMiddleware");

const {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
  searchFoods,
} = require("../controllers/foodController");

const upload =
  require("../middleware/uploadMiddleware");

// Add Food (Admin Only)
router.post(
  "/",
  verifyToken,
  adminOnly,
  upload.single("image"),
  addFood
);

router.get(
  "/search",
  searchFoods
);

// View All Foods
router.get("/", getFoods);

// Update Food (Admin Only)
router.put(
  "/:id",
  verifyToken,
  adminOnly,
  updateFood
);

// Delete Food (Admin Only)
router.delete(
  "/:id",
  verifyToken,
  adminOnly,
  deleteFood
);

module.exports = router;