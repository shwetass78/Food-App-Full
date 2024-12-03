const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  test,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/test", test);
router.post("/logout", protect, logout);

module.exports = router;
