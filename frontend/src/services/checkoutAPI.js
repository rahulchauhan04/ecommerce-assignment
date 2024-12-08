import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const checkoutCart = async ({ discountCode }) => {
  try {
    const response = await axios.post(`${BASE_URL}/checkout`, {
      discountCode: discountCode || null, // Send null if no discount code is provided
    });
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};