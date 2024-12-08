const request = require('supertest');
const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const cartModel = require('../models/cartModel');

const app = express();
app.use(express.json());
app.post('/checkout', checkoutController.checkoutCart);

describe('Checkout Controller', () => {
     beforeEach(() => {
          cartModel.clearCart();
     });

     it('should successfully checkout with a discount code', async () => {
          cartModel.addToCart({ productId: 1, quantity: 2 });
          const response = await request(app)
               .post('/checkout')
               .send({ discountCode: 'DISCOUNT10' });
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
               message: 'Checkout successful',
               totalAmount: 200,
               discountApplied: true,
               finalAmount: 180,
          });
     });

     it('should successfully checkout without a discount code', async () => {
          cartModel.addToCart({ productId: 1, quantity: 2 });
          const response = await request(app)
               .post('/checkout')
               .send({ discountCode: null });
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
               message: 'Checkout successful',
               totalAmount: 200,
               discountApplied: false,
               finalAmount: 200,
          });
     });

     it('should handle checkout with an empty cart', async () => {
          const response = await request(app)
               .post('/checkout')
               .send({ discountCode: 'DISCOUNT10' });
          expect(response.status).toBe(400);
          expect(response.body).toEqual({ message: 'Cart is empty' });
     });

     it('should handle invalid discount code', async () => {
          cartModel.addToCart({ productId: 1, quantity: 2 });
          const response = await request(app)
               .post('/checkout')
               .send({ discountCode: 'INVALID_CODE' });
          expect(response.status).toBe(400);
          expect(response.body).toEqual({ message: 'Invalid discount code' });
     });
});