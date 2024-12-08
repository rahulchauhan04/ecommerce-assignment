import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkoutCart } from '../services/checkoutAPI';

const CheckoutPage = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 }; // Default to 0 if not provided

  const handleCheckout = async () => {
    try {
      const response = await checkoutCart(discountCode);
      const { totalAmount, finalAmount, discountApplied } = response;

      setMessage(`Checkout successful! Total: ₹${totalAmount}, Final: ₹${finalAmount}, Discount Applied: ${discountApplied}`);
      setTimeout(() => navigate('/'), 6000);
    } catch (error) {
      setMessage('Failed to checkout: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-bold mb-2">Discount Code</label>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter discount code (optional)"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">Total Price: ₹{totalPrice}</h2>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;