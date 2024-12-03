const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getReviews);
router.post("/add", protect, addReview);

module.exports = router;
