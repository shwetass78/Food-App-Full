import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const { getTotalAmount } = useCart();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="header">
        <Navbar />
        <Header />
      </div>
      <div className="payment-container">
        <div className="payment-container-top">
          <button onClick={handleBackClick}>
            <img src="./image/paymentsImage/arrow-left.png" alt="" />
          </button>
          <h1>Choose and Pay</h1>
        </div>

        <div className="payment-container-bottom">
          <div className="paymentLeftBox">
            <ul>
              <li>
                <img
                  src="./image/paymentsImage/Label.png"
                  alt=""
                  style={{ height: "50px", marginTop: "5px" }}
                />
              </li>
              <hr />
              <li>
                <img src="./image/paymentsImage/Label_1.png" alt="" />
              </li>
              <li>
                <img src="./image/paymentsImage/Label_2.png" alt="" />
              </li>
              <li>
                <img src="./image/paymentsImage/Label_3.png" alt="" />
              </li>
              <li>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  +
                </span>
                <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                  Add Debit Card
                </span>
              </li>
            </ul>
          </div>
          <div className="paymentRightBox">
            <div className="payment-summary">
              <h4>Amount to be payed</h4>
              <p className="total-amount">${getTotalAmount().toFixed(2)}</p>
            </div>
            <hr />
            <button
              className="proceed-payment-btn"
              onClick={() => navigate("/order-success")}
            >
              Proceed Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
