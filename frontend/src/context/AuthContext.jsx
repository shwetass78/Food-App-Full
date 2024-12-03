import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const register = async (userData) => {
    try {
      console.log("Attempting registration with:", userData);
      const response = await axiosInstance.post("/auth/register", userData);
      console.log("Registration response:", response.data);

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Registration error details:", error);
      if (error.response) {
        throw error.response.data.message || "Registration failed";
      } else if (error.request) {
        throw new Error(
          "No response from server. Please check if the server is running."
        );
      } else {
        throw new Error(error.message || "Registration failed");
      }
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
