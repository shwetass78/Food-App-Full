import "./checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressModal from "../../components/addressModal/AddressModal";
import { useCart } from "../../context/CartContext";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import BASE_URL from "../../config";

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddresses, setShowAddresses] = useState(false);
  const navigate = useNavigate();
  const { cartItems, getTotalAmount } = useCart();

  const handleBackClick = () => {
    navigate(-1);
  };

  const subtotal = getTotalAmount();
  const tax = subtotal * 0.1;
  const deliveryFee = 5.0;
  const total = subtotal + tax + deliveryFee;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data);
      if (response.data.length > 0 && !selectedAddress) {
        setSelectedAddress(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddresses(false); // Hide address list after selection
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <div>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkoutMainContainer">
      <div className="checkoutHeader">
        <Navbar />
        <Header />
      </div>
      <div className="checkoutContainer">
        <div className="checkoutContainerTop">
          <button onClick={handleBackClick}>
            <img src="./image/paymentsImage/arrow-left.png" alt="" />
          </button>
          <h1>Your Order Details</h1>
        </div>
        {/* ------------- */}
        <div className="checkoutContainerBottom">
          <div className="checkoutContainerLeft">
            <ul>
              {cartItems.map((item) => (
                <>
                  <li key={item._id} className="order-item">
                    <span className="innerItem">
                      <span style={{ fontWeight: "bold" }}>{item.name}</span>
                      <span>{item.quantity}x item</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                  <hr />
                </>
              ))}
            </ul>
            <li className="order-itemNote">
              <span>Add Note</span>
              <input
                type="text"
                placeholder="Write Here..."
                className="addContentInp"
              />
            </li>
          </div>
          <div className="checkoutContainerRight">
            <li
              className="order-itemAddress"
              onClick={() => navigate("/checkout/address")}
            >
              <div className="mapPinDiv">
                <img src="./image/checkoutImage/MapPin.png" alt="Map pin" />
              </div>
              <button className="change-address-btn">Delivery Address</button>
              <div className="orangeRightArrow">
                <img
                  src="./image/checkoutImage/ArrowRightOrange.png"
                  alt="Map pin"
                />
              </div>
            </li>
            <hr />
            <li className="order-itemCharges">
              <div className="price-row">
                <span>Items</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Sales Tax</span>
                <span>Rs {tax.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>Rs {deliveryFee.toFixed(2)}</span>
              </div>
            </li>
            <hr />
            <li className="order-itemTotal">
              <div className="price-row">
                <span className="subTotalCharges">Subtotal</span>
                <span className="subTotalCharges">Rs {total.toFixed(2)}</span>
              </div>
              <button
                className="proceedToPaymentBtn"
                onClick={() => navigate("/payment")}
                // disabled={!selectedAddress}
              >
                Proceed to Payment →
              </button>
            </li>
          </div>
        </div>

        <div>
          {/* ------------------- */}
          {/* <div>
            {showAddresses ? (
              <div className="addresses-list">
                <div className="addresses-header">
                  <h3>Select Delivery Address</h3>
                  <button
                    onClick={handleAddNewAddress}
                    className="add-new-address-btn"
                  >
                    Add New Address
                  </button>
                </div>
                <div className="addresses-grid">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`address-card ${
                        selectedAddress?._id === address._id ? "selected" : ""
                      }`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className="address-content">
                        <p className="address-text">{address.fullAddress}</p>
                        <p className="address-details">
                          {address.cityDistrict}, {address.state}
                        </p>
                        <p className="address-details">
                          PIN: {address.pinCode}
                        </p>
                        <p className="address-details">
                          Phone: {address.phoneNumber}
                        </p>
                      </div>
                      <div className="address-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address._id);
                          }}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              selectedAddress && (
                <div className="address-box">
                  <p>{selectedAddress.fullAddress}</p>
                  <p>
                    {selectedAddress.cityDistrict}, {selectedAddress.state}
                  </p>
                  <p>PIN: {selectedAddress.pinCode}</p>
                  <p>Phone: {selectedAddress.phoneNumber}</p>
                </div>
              )
            )}

            {!selectedAddress && !showAddresses && (
              <div className="no-address">
                <p>No delivery address selected</p>
                <button
                  onClick={handleAddNewAddress}
                  className="add-address-btn"
                >
                  Add New Address
                </button>
              </div>
            )}
          </div> */}
          {/* ------------------------- */}
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        address={editingAddress}
        onSubmit={() => {
          fetchAddresses();
          setShowAddresses(true);
        }}
      />
      <Footer />
    </div>
  );
}

export default Checkout;
