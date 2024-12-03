import { useNavigate } from "react-router-dom";
import "../../styles/PopularCategories.css";

function PopularCategories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Burger", image: "burger-image-url" },
    { name: "Fries", image: "fries-image-url" },
    { name: "Pizza", image: "pizza-image-url" },
  ];

  return (
    <div className="popular-categories">
      <h2>Popular Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => navigate(`/products?category=${category.name}`)}
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
