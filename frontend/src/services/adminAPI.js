import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Function to generate a discount code
export const generateDiscountCode = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/discount`);
    return response.data;
  } catch (error) {
    console.error('Error generating discount code:', error);
    throw error;
  }
};

// Function to fetch admin statistics
export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};