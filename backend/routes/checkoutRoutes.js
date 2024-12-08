const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const cartModel = require('../models/cartModel');
const discountService = require('../services/discountService');
const orders = [];

const router = express.Router();

router.post('/', checkoutController.checkout);

module.exports = router;

exports.checkout = (req, res) => {
  console.log('Request body:', req.body); // Add this line to log the request body
  const { discountCode } = req.body;
  const cart = cartModel.getCart();

  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * 100, 0); // Assume each item costs 100
  const discount = discountService.validateDiscountCode(discountCode);

  const finalAmount = discount ? totalAmount * 0.9 : totalAmount;

  orders.push({ cart, totalAmount, discount, finalAmount });
  cartModel.clearCart();

  res.status(200).json({
    message: 'Checkout successful',
    totalAmount,
    discountApplied: !!discount,
    finalAmount,
  });
};