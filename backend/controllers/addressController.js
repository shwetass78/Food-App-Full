const Address = require("../models/Address");

// Get all addresses for a user
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
};

// Add new address
const addAddress = async (req, res) => {
  try {
    const { state, cityDistrict, pinCode, phoneNumber, fullAddress } = req.body;

    const address = await Address.create({
      user: req.user._id,
      state,
      cityDistrict,
      pinCode,
      phoneNumber,
      fullAddress,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
