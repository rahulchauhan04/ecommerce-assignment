import React from 'react';

const ProductCard = ({ product, onAddToCart, isAdded }) => {
  return (
    <div className={`border p-4 rounded-lg shadow-lg ${isAdded ? 'bg-green-100' : ''}`}>
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-md font-semibold">₹{product.price}</p>
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;