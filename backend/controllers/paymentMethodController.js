const PaymentMethod = require("../models/PaymentMethod");

// Get all payment methods
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ user: req.user._id });
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment methods" });
  }
};

// Add new payment method
const addPaymentMethod = async (req, res) => {
  try {
    const { cardNumber, cardHolderName, expiryMonth, expiryYear } = req.body;

    const paymentMethod = await PaymentMethod.create({
      user: req.user._id,
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
    });

    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: "Error adding payment method" });
  }
};

// Delete payment method
const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    res.json({ message: "Payment method deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment method" });
  }
};

// Update payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const { cardNumber, cardHolderName, expiryMonth, expiryYear } = req.body;
    const paymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        cardNumber,
        cardHolderName,
        expiryMonth,
        expiryYear,
      },
      { new: true } // Return the updated document
    );

    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    res.json(paymentMethod);
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({ message: "Error updating payment method" });
  }
};

module.exports = {
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  updatePaymentMethod,
};
