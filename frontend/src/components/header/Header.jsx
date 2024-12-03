import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./header.css";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="headerItem1">
          <img src="./image/Logo_1.png" alt="logo" className="homeOrderLogo" />
        </div>
        <div className="headerItem2">
          <ul>
            <li>
              <Link
                to="/home"
                className={location.pathname === "/home" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>Browse Menu</li>
            <li>Special Offers</li>
            <li>
              <Link
                to="/products"
                className={location.pathname === "/products" ? "active" : ""}
              >
                Restaurants
              </Link>
            </li>
            <li>Track Order</li>
          </ul>
        </div>
        <div className="headerItem3">
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            Profile
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
