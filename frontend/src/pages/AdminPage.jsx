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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Admin Stats:</h2>
        <ul className="list-disc pl-6">
          <li>Total Items Purchased: {stats.totalItemsPurchased}</li>
          <li>Total Purchase Amount: ₹{stats.totalPurchaseAmount}</li>
          <li>Discount Codes Generated: {stats.discountCodesGenerated}</li>
          <li>Total Discount Applied: ₹{stats.totalDiscountApplied}</li>
        </ul>
      </div>
      <button
        onClick={handleGenerateDiscount}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Discount Code
      </button>
    </div>
  );
};

export default AdminPage;