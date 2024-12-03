import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";
import CheckoutAddressPage from "./pages/checkoutAddress/CheckoutAddressPage";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";
import Payment from "./pages/payment/Payment";

import PrivateRoute from "./components/PrivateRoute";
import AddressManagement from "./components/addressManagement/AddressManagement";
import PaymentMethodForm from "./components/paymentMethodForm/PaymentMethodForm";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/addresses"
              element={
                <PrivateRoute>
                  <AddressManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-payment-method"
              element={
                <PrivateRoute>
                  <PaymentMethodForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout/address"
              element={
                <PrivateRoute>
                  <CheckoutAddressPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
