import React from "react";
import "./productsBox4.css";

const ProductsBox4 = () => {
  return (
    <div className="productsBox4Container">
      {/* Delivery Information Section */}
      <div className="infoBox deliveryInfo">
        <div className="infoHeader">
          <span className="infoIcon">🚚</span>
          <h3 className="infoTitle">Delivery information</h3>
        </div>
        <ul className="infoDetails">
          <li>
            <strong>Monday:</strong> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Tuesday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Wednesday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Thursday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Friday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Saturday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Sunday:</strong> 8:00 AM–12:00 AM
          </li>
        </ul>
        <p className="deliveryEstimation">
          <strong>Estimated time until delivery:</strong> 20 min
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="infoBox contactInfo">
        <div className="infoHeader">
          <span className="infoIcon">📋</span>
          <h3 className="infoTitle">Contact information</h3>
        </div>
        <ul className="infoDetails">
          <li>If you have allergies or other dietary</li>
          <li> restrictions, please contact the restaurant.</li>
          <li>The restaurant will provide food-specific </li>
          <li>information upon request.</li>
          <li>
            <strong>Phone number:</strong> +934443-43
          </li>
          <li>
            <strong>Website:</strong>{" "}
          </li>
          <li>
            <a
              href="http://mcdonalds.uk/"
              style={{ color: "black", fontSize: "20px" }}
            >
              http://mcdonalds.uk/
            </a>
          </li>
        </ul>
      </div>

      {/* Operational Times Section */}
      <div className="infoBox operationalTimes">
        <div className="infoHeader">
          <span className="infoIcon">⏰</span>
          <h3 className="infoTitle">Operational Times</h3>
        </div>
        <ul className="infoDetails">
          <li>
            <strong>Monday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Tuesday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Wednesday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Thursday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Friday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Saturday:</strong> 8:00 AM–3:00 AM
          </li>
          <li>
            <strong>Sunday:</strong> 8:00 AM–3:00 AM
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductsBox4;
