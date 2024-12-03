import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./navbar.css";
// import cartIcon from "../../assets/cart-icon.png";

const Navbar = () => {
  const { toggleCart, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    toggleCart();
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="item1">
          🌟 Get 5% Off your first order, Promo: ORDER5
        </div>
        <div className="item2">
          Regent Street, A4, A4201, <span>London Change Location</span>
        </div>
        <div className="item3">
          <button onClick={handleCartClick}>
            My Cart
            {/* <img src={cartIcon} alt="Cart" className="cart-icon" /> */}
            {cartItemCount > 0 && <span>{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
