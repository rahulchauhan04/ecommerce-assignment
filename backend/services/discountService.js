// backend/services/discountService.js

const validDiscountCodes = ['DISCOUNT10', 'SAVE20']; // Example discount codes

exports.generateDiscountCode = () => {
  const newCode = `DISCOUNT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  validDiscountCodes.push(newCode);
  return newCode;
};

exports.validateDiscountCode = (code) => {
  console.log('Validating discount code:', code); // Add this line
  if (!code) return false;
  const isValid = validDiscountCodes.includes(code);
  if (isValid) {
    // Remove the code after it is used
    const index = validDiscountCodes.indexOf(code);
    validDiscountCodes.splice(index, 1);
  }
  return isValid;
};

exports.getDiscountCodes = () => {
  return validDiscountCodes;
};