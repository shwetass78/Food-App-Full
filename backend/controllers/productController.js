const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
    res.json(groupedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;
    const product = await Product.create({
      name,
      category,
      price,
      image,
      description,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
