import React, { useState, useEffect } from 'react';
import { generateDiscountCode, getAdminStats } from '../services/adminAPI';

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalItemsPurchased: 0,
    totalPurchaseAmount: 0,
    discountCodesGenerated: 0,
    totalDiscountApplied: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const handleGenerateDiscount = async () => {
    try {
      const response = await generateDiscountCode();
      setMessage(`New Discount Code: ${response.discountCode}`);
      fetchAdminStats(); // Refresh stats
    } catch (error) {
      console.error('Error generating discount code:', error);
      setMessage('Failed to generate discount code.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 text-white">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Admin Dashboard
        </h1>
        {message && <p className="mb-4 text-green-500 text-center">{message}</p>}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Admin Stats:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Total Items Purchased</h3>
              <p className="text-2xl">{stats.totalItemsPurchased}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Total Purchase Amount</h3>
              <p className="text-2xl">₹{stats.totalPurchaseAmount}</p>
            </div>
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Discount Codes Generated</h3>
              <p className="text-2xl">{stats.discountCodesGenerated}</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-400 to-blue-500 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Total Discount Applied</h3>
              <p className="text-2xl">₹{stats.totalDiscountApplied}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleGenerateDiscount}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Generate Discount Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;