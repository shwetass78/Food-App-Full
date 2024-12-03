const express = require("express");
const router = express.Router();
const {
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  updatePaymentMethod,
} = require("../controllers/paymentMethodController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.route("/").get(getPaymentMethods).post(addPaymentMethod);

router.route("/:id").put(updatePaymentMethod).delete(deletePaymentMethod);

module.exports = router;
