import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
import Footer from "../../components/footer/Footer";
// import "../../styles/Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="formContainer">
          <div className="logo1">
            <img src="./image/Logo_1.png" alt="" className="logoImage" />
          </div>
          <div className="description">
            <h2>Welcome Back 👋 </h2>
            <p>Today is a new day. It's your day. You shape it.</p>
            <p>Sign in to start ordering.</p>
          </div>
          <form onSubmit={handleSubmit} className="loginForm">
            {error && <div>{error}</div>}
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="Example@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button type="submit" className="signInBtn">
              Sign in
            </button>
            <div className="signUp">
              <span>
                Don't you have an account?{" "}
                <Link to="/register">
                  <span style={{ color: "#fc8a06" }}>Sign up</span>
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="imageContainer">
          <img src="./image/Art.jpg" alt="image" className="artImage" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
