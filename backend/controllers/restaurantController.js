const Restaurant = require("../models/Restaurant");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const restaurant = await Restaurant.create({
      name,
      image,
      description,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error adding restaurant" });
  }
};

module.exports = {
  getRestaurants,
  addRestaurant,
};
