const cartModel = require('../models/cartModel');
const discountService = require('../services/discountService');

// Global orders array to store all orders
const orders = [];
let orderCount = 0;
const nthOrder = 5; // Example: every 5th order gets a discount code

exports.checkoutCart = (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this line to log the request body
    const { discountCode } = req.body;
    const cartItems = cartModel.getCart();

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * 100, 0); // Assuming price = 100/item
    let discountApplied = false;
    let finalAmount = totalAmount;

    if (discountCode) {
      const isValidCode = discountService.validateDiscountCode(discountCode);
      if (isValidCode) {
        discountApplied = true;
        finalAmount = totalAmount * 0.9; // Apply 10% discount
      } else {
        return res.status(400).json({ message: 'Invalid discount code' });
      }
    }

    // Simulate order placement
    orders.push({
      items: cartItems,
      totalAmount,
      discountApplied,
      finalAmount,
    });

    cartModel.clearCart();
    orderCount++;

    // Generate discount code for every nth order
    if (orderCount % nthOrder === 0) {
      const newDiscountCode = discountService.generateDiscountCode();
      return res.status(200).json({
        message: 'Checkout successful',
        totalAmount,
        discountApplied,
        finalAmount,
        newDiscountCode,
      });
    }

    res.status(200).json({
      message: 'Checkout successful',
      totalAmount,
      discountApplied,
      finalAmount,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Checkout failed' });
  }
};

// Export orders array for use in adminController
exports.orders = orders;