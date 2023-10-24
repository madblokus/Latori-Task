import React, { createContext, useContext, useReducer } from 'react';

interface Product {
  id: string;
  quantity: number;
}

interface CartState {
  products: Product[];
}

interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: Product;
}

type CartActions = AddToCartAction;

const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartActions> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { products: [...state.products, action.payload] };
    default:
      return state;
  }
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
