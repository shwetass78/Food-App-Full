import { useState, useEffect } from "react";
import axios from "axios";
import PaymentCardModal from "../../components/paymentCardModal/PaymentCardModal";
import "../../styles/Profile.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editedInfo, setEditedInfo] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedInfo({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/payment-methods`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/api/users/profile`, editedInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...editedInfo });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/payment-methods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  const handlePaymentMethodUpdate = async () => {
    await fetchPaymentMethods();
  };

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <Navbar />
      <Header />
      <div className="profile-content">
        <div>
          <button onClick={handleBackClick}>Go Back</button>
        </div>
        <h1 className="profile-header">My Profile</h1>

        {/* Profile Overview */}
        <div className="profile-overview">
          <div className="profile-image-section">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg"
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-basic-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="info-section">
          <div className="section-header">
            <h3 className="section-title">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleEditSubmit} className="save-button">
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedInfo({
                      name: user.name || "",
                      email: user.email || "",
                      gender: user.gender || "",
                      country: user.country || "",
                    });
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="info-grid">
            <div className="info-field">
              <label className="field-label">Full Name</label>
              <div className="field-value">{user.name}</div>
            </div>

            <div className="info-field">
              <label className="field-label">Email Address</label>
              <div className="field-value">{user.email}</div>
            </div>

            <div className="info-field">
              <label className="field-label">Gender</label>
              {isEditing ? (
                <select
                  value={editedInfo.gender}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, gender: e.target.value })
                  }
                  className="field-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="field-value">
                  {user.gender || "Not specified"}
                </div>
              )}
            </div>

            <div className="info-field">
              <label className="field-label">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedInfo.country}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, country: e.target.value })
                  }
                  className="field-input"
                />
              ) : (
                <div className="field-value">
                  {user.country || "Not specified"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-section">
          <div className="payment-header">
            <h3 className="section-title">Payment Methods</h3>
            <button
              onClick={() => {
                setEditingCard(null);
                setIsCardModalOpen(true);
              }}
              className="add-payment-button"
            >
              Add New Card
            </button>
          </div>

          {paymentMethods.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💳</div>
              <p className="empty-state-text">No payment methods saved yet</p>
            </div>
          ) : (
            <div className="payment-cards-grid">
              {paymentMethods.map((method) => (
                <div key={method._id} className="payment-card">
                  <div className="card-chip" />
                  <div className="card-content">
                    <p className="card-number">
                      •••• •••• •••• {method.cardNumber.slice(-4)}
                    </p>
                    <div className="card-info">
                      <p className="card-holder">{method.cardHolderName}</p>
                      <p className="card-expiry">
                        {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleEditCard(method)}
                      className="edit-card"
                      aria-label="Edit card"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeletePaymentMethod(method._id)}
                      className="delete-card"
                      aria-label="Delete card"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PaymentCardModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(null);
        }}
        onSubmit={handlePaymentMethodUpdate}
        editCard={editingCard}
      />
    </div>
  );
};

export default Profile;
