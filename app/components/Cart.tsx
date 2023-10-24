import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { state } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {state.products.map((product, index) => (
          <li key={index}>
            Product ID: {product.id}, Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
