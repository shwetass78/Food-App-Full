const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Routes
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

module.exports = router;
