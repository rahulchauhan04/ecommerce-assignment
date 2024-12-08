const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/discount', adminController.generateDiscountCode);
router.get('/stats', adminController.getAdminStats); 

module.exports = router;