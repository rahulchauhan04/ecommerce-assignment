const express = require('express');
const cartController = require('../controllers/cartController');
const validateCart = require('../middlewares/validateCart');

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/', validateCart, cartController.addToCart);
router.delete('/:productId', cartController.removeFromCart);
router.get('/total', cartController.getTotalPrice);

module.exports = router;
