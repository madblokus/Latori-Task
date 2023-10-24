import React from 'react';
import { useCart } from '../../contexts/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();  // Destructure dispatch from useCart

  const handleRemove = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {state.products.map((product, index) => (
          <li key={index}>
            Product ID: {product.id}, Quantity: {product.quantity}
            {product.price*product.quantity}
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
