const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const restaurants = require("../data/restaurantSeed");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      await Restaurant.deleteMany({}); // Clear existing restaurants
      await Restaurant.insertMany(restaurants);
      console.log("Restaurants seeded successfully");
      process.exit(0);
    } catch (error) {
      console.error("Error seeding restaurants:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
