import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PaymentCardModal.css";
import BASE_URL from "../../config";

const PaymentCardModal = ({ isOpen, onClose, onSubmit, editCard }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardHolderName: "",
  });

  useEffect(() => {
    if (editCard) {
      setFormData({
        cardNumber: editCard.cardNumber.replace(/[^\d]/g, ""),
        expiryMonth: editCard.expiryMonth,
        expiryYear: editCard.expiryYear,
        cvc: "",
        cardHolderName: editCard.cardHolderName,
      });
    } else {
      setFormData({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        cardHolderName: "",
      });
    }
  }, [editCard, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editCard) {
        await axios.put(
          `${BASE_URL}/api/payment-methods/${editCard._id}`,
          {
            cardNumber: formData.cardNumber,
            cardHolderName: formData.cardHolderName,
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(`${BASE_URL}/api/payment-methods`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await onSubmit();
      onClose();
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editCard ? "Edit Card" : "Add New Card"}</h3>
          <button onClick={onClose} className="modal-close-btn">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setFormData({ ...formData, cardNumber: formatted });
              }}
              className="form-input"
              maxLength="16"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="expiry-cvc-group">
            <div className="form-group expiry-group">
              <label>Expiration</label>
              <div className="expiry-inputs">
                <input
                  type="text"
                  value={formData.expiryMonth}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setFormData({ ...formData, expiryMonth: value });
                  }}
                  placeholder="MM"
                  maxLength="2"
                  required
                />
                <span>/</span>
                <input
                  type="text"
                  value={formData.expiryYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setFormData({ ...formData, expiryYear: value });
                  }}
                  placeholder="YY"
                  maxLength="2"
                  required
                />
              </div>
            </div>

            <div className="form-group cvc-group">
              <label>CVC</label>
              <input
                type="text"
                value={formData.cvc}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setFormData({ ...formData, cvc: value });
                }}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              value={formData.cardHolderName}
              onChange={(e) =>
                setFormData({ ...formData, cardHolderName: e.target.value })
              }
              placeholder="John Doe"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editCard ? "Update Card" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCardModal;
