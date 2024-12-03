const mongoose = require("mongoose");
const Review = require("../models/Review");
const reviews = require("../data/reviewSeed");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      await Review.deleteMany({}); // Clear existing reviews
      await Review.insertMany(reviews);
      console.log("Reviews seeded successfully");
      process.exit(0);
    } catch (error) {
      console.error("Error seeding reviews:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
