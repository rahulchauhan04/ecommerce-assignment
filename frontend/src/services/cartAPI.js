import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const removeCartItem = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};

export const getCartTotal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/total`);
    return response.data.totalPrice;
  } catch (error) {
    console.error('Error fetching cart total:', error);
    throw error;
  }
};