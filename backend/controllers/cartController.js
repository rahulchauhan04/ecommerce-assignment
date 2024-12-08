const cartModel = require('../models/cartModel');

exports.getCart = (req, res) => {
  const cart = cartModel.getCart();
  res.status(200).json(cart);
};

exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const newItem = { productId, quantity };
  cartModel.addToCart(newItem);
  res.status(201).json({ message: 'Item added to cart', newItem });
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.params;
  const cart = cartModel.getCart();
  const itemIndex = cart.findIndex(item => item.productId === parseInt(productId));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  cart.splice(itemIndex, 1);
  res.status(200).json({ message: 'Item removed from cart' });
};

exports.getTotalPrice = (req, res) => {
  const cart = cartModel.getCart();
  const totalPrice = cart.reduce((total, item) => total + item.quantity * 100, 0); // Assuming price = 100/item
  res.status(200).json({ totalPrice });
};