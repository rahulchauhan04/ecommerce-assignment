const discountService = require('../services/discountService');
const orders = [];
const discountCodes = discountService.getDiscountCodes(); // Assuming this function exists to get all discount codes

exports.generateDiscountCode = (req, res) => {
  try {
    const code = discountService.generateDiscountCode();
    res.status(201).json({ discountCode: code });
  } catch (error) {
    console.error('Error generating discount code:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAdminStats = (req, res) => {
  try {
    const totalItemsPurchased = orders.reduce((sum, order) => sum + order.cart.length, 0);
    const totalPurchaseAmount = orders.reduce((sum, order) => sum + order.finalAmount, 0);
    const discountCodesGenerated = discountCodes.length;
    const totalDiscountApplied = orders.reduce((sum, order) => sum + (order.discountApplied ? order.totalAmount - order.finalAmount : 0), 0);

    res.status(200).json({
      totalItemsPurchased,
      totalPurchaseAmount,
      discountCodesGenerated,
      totalDiscountApplied,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};