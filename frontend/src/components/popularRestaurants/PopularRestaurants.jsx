import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./popularRestaurant.css";
import BASE_URL from "../../config";

function PopularRestaurants({ heading }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/restaurants`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [user.token]);

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="popularRestaurantsContainer">
      <h2>{heading}</h2>
      <div className="restaurantsScroll">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurantCard"
            onClick={() => navigate("/products")}
          >
            <img
              className="restaurantImage"
              src={restaurant.image}
              alt={restaurant.name}
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularRestaurants;
