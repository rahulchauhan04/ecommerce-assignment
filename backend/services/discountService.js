// backend/services/discountService.js

const validDiscountCodes = ['DISCOUNT10', 'SAVE20']; // Example discount codes

exports.generateDiscountCode = () => {
  // Generate a new discount code (this is just an example)
  const newCode = `DISCOUNT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  validDiscountCodes.push(newCode);
  return newCode;
};

exports.validateDiscountCode = (code) => {
  if (!code) return false;
  return validDiscountCodes.includes(code);
};

exports.getDiscountCodes = () => {
  return validDiscountCodes;
};