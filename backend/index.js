const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS middleware
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);

// Home page route (protected)
app.get(
  "/api/home",
  require("./middleware/authMiddleware").protect,
  (req, res) => {
    res.json({ message: "Welcome to the homepage!", user: req.user });
  }
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Products page route (protected)
app.get(
  "/api/products",
  require("./middleware/authMiddleware").protect,
  (req, res) => {
    res.json({ message: "Welcome to the products page!", products: [] });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
