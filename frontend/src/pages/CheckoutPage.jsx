import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkoutCart } from '../services/checkoutAPI';

const CheckoutPage = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 }; // Default to 0 if not provided

  // Handle the checkout process
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await checkoutCart({ discountCode });
      setMessage(`Checkout successful! Order details: ${JSON.stringify(response)}`);
      setTimeout(() => {
        navigate('/'); // Redirect to home page after a success message
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(`Failed to checkout: ${error.response.data.message}`);
      } else {
        setMessage('An unexpected error occurred during checkout.');
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="checkout-message">
        {message && <p className={message.includes('Failed') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
      </div>
      <form onSubmit={handleCheckout} className="space-y-4">
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