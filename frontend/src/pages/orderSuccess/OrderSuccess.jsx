import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <Navbar />
        <Header />
      </div>
      <div className="order-success-container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Order Successful!</h1>
          <p>Your order has been placed successfully.</p>
          <p>
            Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <div className="contentWithBtn">
            <span>Royal Cheese Burger</span>
            <span>Potato Veggies</span>
            <span>Coke Coca Cola</span>
            <button className="back-home-btn" onClick={() => navigate("/home")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderSuccess;
