let cart = [];

module.exports = {
  getCart: () => cart,
  addToCart: (item) => cart.push(item),
  clearCart: () => { cart = []; },
};