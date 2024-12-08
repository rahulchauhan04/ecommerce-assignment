const cartModel = require('../models/cartModel');
const discountService = require('../services/discountService');
const orders = [];

exports.checkout = (req, res) => {
  console.log('Request body:', req.body);
  const { discountCode } = req.body;
  const cart = cartModel.getCart();

  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * 100, 0); // Assuming price = 100/item

  let discountApplied = false;
  let finalAmount = totalAmount;

  if (discountService.validateDiscountCode(discountCode)) {
    discountApplied = true;
    finalAmount = totalAmount * 0.9; // 10% discount
  }

  orders.push({ cart, totalAmount, discountApplied, finalAmount });
  cartModel.clearCart();

  return res.status(200).json({
    message: 'Checkout successful',
    totalAmount,
    discountApplied,
    finalAmount,
  });
};