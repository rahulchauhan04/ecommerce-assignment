import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, removeCartItem, getCartTotal } from '../services/cartAPI';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to fetch cart items');
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await removeCartItem(productId);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      const totalPrice = await getCartTotal();
      navigate('/checkout', { state: { totalPrice } });
    } catch (error) {
      console.error('Failed to fetch total price:', error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity * 100, 0); // Assume price = 100 per item
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {cartItems.map((item, index) => (
          <li key={`${item.productId}-${index}`} className="border p-4 rounded-lg">
            <h2 className="text-lg font-bold">{item.productId}</h2>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => handleRemoveItem(item.productId)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Total Price: ₹{calculateTotalPrice(cartItems)}</h2>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;