import axios from 'axios';
import { checkoutCart } from './checkoutAPI';

jest.mock('axios');

describe('checkoutAPI', () => {
     describe('checkoutCart', () => {
          it('should successfully checkout with a discount code', async () => {
               const mockResponse = {
                    data: {
                         message: 'Checkout successful',
                         totalAmount: 500,
                         discountApplied: true,
                         finalAmount: 450,
                    },
               };
               axios.post.mockResolvedValue(mockResponse);

               const response = await checkoutCart({ discountCode: 'DISCOUNT10' });

               expect(response).toEqual(mockResponse.data);
               expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/checkout`, {
                    discountCode: 'DISCOUNT10',
               });
          });

          it('should successfully checkout without a discount code', async () => {
               const mockResponse = {
                    data: {
                         message: 'Checkout successful',
                         totalAmount: 500,
                         discountApplied: false,
                         finalAmount: 500,
                    },
               };
               axios.post.mockResolvedValue(mockResponse);

               const response = await checkoutCart({ discountCode: null });

               expect(response).toEqual(mockResponse.data);
               expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/checkout`, {
                    discountCode: null,
               });
          });

          it('should handle checkout error', async () => {
               const mockError = new Error('Checkout failed');
               axios.post.mockRejectedValue(mockError);

               await expect(checkoutCart({ discountCode: 'INVALID_CODE' })).rejects.toThrow('Checkout failed');
               expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/checkout`, {
                    discountCode: 'INVALID_CODE',
               });
          });
     });
});