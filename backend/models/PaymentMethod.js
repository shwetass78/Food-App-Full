const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    expiryMonth: {
      type: String,
      required: true,
    },
    expiryYear: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Only store last 4 digits of card number
paymentMethodSchema.pre("save", function (next) {
  if (this.isModified("cardNumber")) {
    this.cardNumber = "****" + this.cardNumber.slice(-4);
  }
  next();
});

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);
