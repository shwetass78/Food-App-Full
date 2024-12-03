const Review = require("../models/Review");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

const addReview = async (req, res) => {
  try {
    const { userName, profilePic, location, rating, description } = req.body;
    const review = await Review.create({
      userName,
      profilePic,
      location,
      rating,
      description,
      date: new Date(),
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

module.exports = {
  getReviews,
  addReview,
};
