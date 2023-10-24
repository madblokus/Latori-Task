import React, { createContext, useContext, useEffect, useReducer } from "react";

interface Product {
  id: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
}

interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: Product;
}

interface InitCartAction {
  type: "INIT_CART";
  payload: Product[];
}

interface RemoveFromCartAction {
  type: "REMOVE_FROM_CART";
  payload: string;
}

type CartActions = AddToCartAction | InitCartAction | RemoveFromCartAction;

const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartActions> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        return {
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  price: action.payload.price,
                }
              : product
          ),
        };
      }

      return { products: [...state.products, action.payload] };

    case "INIT_CART":
      return { products: action.payload };
    case "REMOVE_FROM_CART":
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  useEffect(() => {
    console.log("Initializing cart from localStorage...");
    const loadedCart = localStorage.getItem("cart");
    console.log(`Loaded cart from localStorage: ${loadedCart}`);
    if (loadedCart) {
      dispatch({
        type: "INIT_CART",
        payload: JSON.parse(loadedCart),
      });
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (state.products.length > 0) {
      console.log("Saving to localStorage...");
      localStorage.setItem("cart", JSON.stringify(state.products));
    } else {
      console.log("Cart is empty. Not updating localStorage.");
    }
  }, [state.products]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
