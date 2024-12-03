import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AddressModal.css";
import BASE_URL from "../../config";

const AddressModal = ({ isOpen, onClose, address, onSubmit }) => {
  const [formData, setFormData] = useState({
    state: "",
    cityDistrict: "",
    pinCode: "",
    phoneNumber: "",
    fullAddress: "",
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        state: "",
        cityDistrict: "",
        pinCode: "",
        phoneNumber: "",
        fullAddress: "",
      });
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (address) {
        await axios.put(`${BASE_URL}/api/addresses/${address._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${BASE_URL}/api/addresses`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{address ? "Edit Address" : "Add New Address"}</h3>
          <button onClick={onClose} className="modal-close-btn">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>City/District</label>
            <input
              type="text"
              value={formData.cityDistrict}
              onChange={(e) =>
                setFormData({ ...formData, cityDistrict: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>PIN Code</label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) =>
                setFormData({ ...formData, pinCode: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Full Address</label>
            <textarea
              value={formData.fullAddress}
              onChange={(e) =>
                setFormData({ ...formData, fullAddress: e.target.value })
              }
              className="form-textarea"
              rows="3"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
