const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistedToken = require("../models/BlacklistedToken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const test = async (req, res) => {
  try {
    const result = await User.find();
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Register user
const register = async (req, res) => {
  try {
    console.log("Registration request received:", req.body);
    const { name, phone, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      console.log("Invalid phone number:", phone);
      return res
        .status(400)
        .json({ message: "Phone number must be 10 digits" });
    }

    // Validate password length
    if (password.length < 8) {
      console.log("Password too short");
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      email,
      password,
    });

    if (user) {
      console.log("User created successfully:", user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add logout functionality
const logout = async (req, res) => {
  try {
    // Add the token to blacklist
    await BlacklistedToken.create({
      token: req.token,
    });

    res.json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  test,
};
