const validateCart = (req, res, next) => {
  const { productId, quantity } = req.body;

  // Check if productId and quantity are provided
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required.' });
  }

  // Check if quantity is a positive number
  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateCart;