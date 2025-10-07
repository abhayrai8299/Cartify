import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const [limitReached, setLimitReached] = useState(false);

  const hasOffer = product.price > 50;
  const discountPercent = 20;
  const discountedPrice = hasOffer
    ? (product.price * (1 - discountPercent / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleIncrement = () => {
    if (cartItem.quantity >= 6) {
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 3000);
      return;
    }
    incrementQuantity(product.id);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      {/* Offer Badge */}
      {hasOffer && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-tr-xl rounded-bl-xl z-10 shadow-md">
          {discountPercent}% OFF
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-48 object-contain mb-4 rounded-xl transition-transform duration-500 hover:scale-105"
        />

        {/* Product Title */}
        <h2 className="text-md font-semibold text-gray-800 mb-1 text-center line-clamp-1">
          {product.title}
        </h2>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {hasOffer ? (
            <>
              <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
              <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full font-semibold text-sm shadow-inner">
                ${discountedPrice}
              </span>
            </>
          ) : (
            <span className="text-blue-800 bg-blue-100 px-3 py-1 rounded-full font-semibold text-sm shadow-inner">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <p className="text-xs mt-2 text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm">
          ⭐ {product.rating?.rate || 'N/A'} / 5
        </p>

        {/* View Details */}
        <Link
          to={`/products/${product.id}`}
          className="mt-3 inline-block text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 px-4 py-2 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
        >
          View Details
        </Link>

        {/* Cart Buttons */}
        <div className="mt-4 w-full">
          {cartItem ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => decrementQuantity(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition"
                >
                  +
                </button>
              </div>
              {limitReached && (
                <div className="mt-2 px-3 py-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded-md flex items-center space-x-2 animate-pulse shadow-inner">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856C19.07 19 20 17.657 20 16.25V7.75C20 6.343 19.07 5 17.918 5H6.082C4.93 5 4 6.343 4 7.75v8.5C4 17.657 4.93 19 6.082 19z"
                    />
                  </svg>
                  <span>Max limit of 6 items per product reached</span>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white py-2 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
