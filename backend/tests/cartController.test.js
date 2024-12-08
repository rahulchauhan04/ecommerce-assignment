const request = require('supertest');
const express = require('express');
const cartController = require('../controllers/cartController');
const cartModel = require('../models/cartModel');

const app = express();
app.use(express.json());
app.get('/cart', cartController.getCart);
app.post('/cart', cartController.addToCart);
app.delete('/cart/:productId', cartController.removeFromCart);
app.get('/cart/total', cartController.getTotalPrice);

describe('Cart Controller', () => {
     beforeEach(() => {
          cartModel.clearCart();
     });

     it('should get an empty cart', async () => {
          const response = await request(app).get('/cart');
          expect(response.status).toBe(200);
          expect(response.body).toEqual([]);
     });

     it('should add an item to the cart', async () => {
          const response = await request(app)
               .post('/cart')
               .send({ productId: 1, quantity: 2 });
          expect(response.status).toBe(201);
          expect(response.body).toEqual({
               message: 'Item added to cart',
               newItem: { productId: 1, quantity: 2 },
          });

          const cartResponse = await request(app).get('/cart');
          expect(cartResponse.body).toEqual([{ productId: 1, quantity: 2 }]);
     });

     it('should remove an item from the cart', async () => {
          await request(app).post('/cart').send({ productId: 1, quantity: 2 });
          const response = await request(app).delete('/cart/1');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'Item removed from cart' });

          const cartResponse = await request(app).get('/cart');
          expect(cartResponse.body).toEqual([]);
     });

     it('should return 404 when removing an item that does not exist', async () => {
          const response = await request(app).delete('/cart/999');
          expect(response.status).toBe(404);
          expect(response.body).toEqual({ message: 'Item not found in cart' });
     });

     it('should get the total price of items in the cart', async () => {
          await request(app).post('/cart').send({ productId: 1, quantity: 2 });
          await request(app).post('/cart').send({ productId: 2, quantity: 3 });

          const response = await request(app).get('/cart/total');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ totalPrice: 500 }); // 2*100 + 3*100
     });
});