import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";

const PaymentMethodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/payment-methods`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error adding payment method:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Payment Method</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              maxLength="16"
              pattern="\d{16}"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              type="text"
              value={formData.cardHolderName}
              onChange={(e) =>
                setFormData({ ...formData, cardHolderName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Month
              </label>
              <input
                type="text"
                value={formData.expiryMonth}
                onChange={(e) =>
                  setFormData({ ...formData, expiryMonth: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                maxLength="2"
                pattern="\d{2}"
                placeholder="MM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Year
              </label>
              <input
                type="text"
                value={formData.expiryYear}
                onChange={(e) =>
                  setFormData({ ...formData, expiryYear: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                maxLength="2"
                pattern="\d{2}"
                placeholder="YY"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
