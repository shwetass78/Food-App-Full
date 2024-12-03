import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Footer from "../../components/footer/Footer";
import BASE_URL from "../../config";
// import "../../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (formData.phone.length !== 10) {
        setError("Phone number must be 10 digits");
        return;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData
      );

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container">
      <div className="registerContainer">
        <div className="registerFormContainer">
          <div className="logo11">
            <img src="./image/Logo_1.png" alt="" className="logoImage1" />
          </div>
          <div className="description1">
            <h2> Welcome 👋 </h2>
            <p>Today is a new day. It's your day. You shape it.</p>
            <p>Sign in to start ordering.</p>
          </div>
          <form className="registerForm" onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input1"
              placeholder="eg. John A"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              required
              className="input1"
              placeholder="Enter your 10 digit mobile number"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input1"
              placeholder="Example@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength="8"
              className="input1"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" className="signUpBtn">
              Continue
            </button>
            <div className="signIn">
              <span>
                Already have an account?{" "}
                <Link to="/login">
                  <span style={{ color: "#fc8a06" }}>Sign in</span>
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="imageContainer1">
          <img src="./image/Art.jpg" alt="image" className="artImage1" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
