const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  addRestaurant,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getRestaurants);
router.post("/add", protect, addRestaurant);

module.exports = router;
