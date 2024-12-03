const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60, // Automatically delete after 30 days
  },
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
