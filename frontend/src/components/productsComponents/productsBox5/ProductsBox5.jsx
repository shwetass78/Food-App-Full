import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./productsBox5.css";

const ProductsBox5 = () => {
  return (
    <div className="containerProducts5">
      <div className="productsBox5Container">
        <div className="overlayContent">
          <h2>McDonald's</h2>
          <p className="locationName">South London</p>
          <p className="address">
            Tooley St, London Bridge, London SE1 2TF, United Kingdom
          </p>
          <p>
            <strong>Phone number:</strong>
          </p>
          <p style={{ color: " #fc8a06" }}>+934443-43</p>
          <p>
            <strong>Website:</strong>{" "}
          </p>
          <p>
            <a href="http://mcdonalds.uk/" style={{ color: "#fc8a06" }}>
              http://mcdonalds.uk/
            </a>
          </p>
        </div>

        <MapContainer
          className="leafletMap"
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>McDonald's South London</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ProductsBox5;
