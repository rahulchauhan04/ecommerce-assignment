const request = require('supertest');
const express = require('express');
const adminController = require('../controllers/adminController');

const app = express();
app.use(express.json());
app.post('/admin/discount', adminController.generateDiscountCode);
app.get('/admin/stats', adminController.getAdminStats);

describe('Admin Controller', () => {
     it('should generate a new discount code', async () => {
          const response = await request(app).post('/admin/discount');
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty('discountCode');
     });

     it('should get admin stats', async () => {
          const response = await request(app).get('/admin/stats');
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('totalItemsPurchased');
          expect(response.body).toHaveProperty('totalPurchaseAmount');
          expect(response.body).toHaveProperty('discountCodesGenerated');
          expect(response.body).toHaveProperty('totalDiscountApplied');
     });
});