import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import mockProducts from '../mockProducts';
import { addToCart } from '../services/cartAPI';

const HomePage = () => {
  const navigate = useNavigate();
  const [products] = React.useState(mockProducts);
  const [message, setMessage] = React.useState('');
  const [addedProductId, setAddedProductId] = React.useState(null);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1); // Assume quantity = 1
      setMessage('Item added to cart successfully!');
      setAddedProductId(productId);
      setTimeout(() => {
        setMessage('');
        setAddedProductId(null);
      }, 2000); // Clear message and effect after 2 seconds
    } catch (error) {
      setMessage('Failed to add item to cart.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {message && <p className={`mb-4 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      <button
        onClick={() => navigate('/cart')}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        View Cart
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            isAdded={addedProductId === product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;