// Importing necessary modules from React library
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Product interface defining the shape of a product object
interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
}

// State shape for the Cart
interface CartState {
  products: Product[];
}

// Action types for manipulating cart
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

// Union type of all action types
type CartActions = AddToCartAction | InitCartAction | RemoveFromCartAction;

// Creating a context for Cart
const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartActions> } | undefined
>(undefined);

// Reducer function to manage state transitions
const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    // Action to add a product to the cart
    case "ADD_TO_CART":
      // Check if the product already exists in the cart
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      // If exists, update the product; else, add new
      if (existingProduct) {
        return {
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  // Updating only required fields
                  title: action.payload.title,
                  quantity: product.quantity + 1,
                  price: action.payload.price,
                  images: action.payload.images,
                }
              : product
          ),
        };
      }
      return { products: [...state.products, action.payload] };

    // Initialize cart with existing items
    case "INIT_CART":
      return { products: action.payload };

    // Action to remove a product from the cart
    case "REMOVE_FROM_CART":
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    // Default case: return existing state
    default:
      return state;
  }
};

// Cart Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state and dispatch using React's useReducer
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  // Initialize cart from localStorage
  useEffect(() => {
    console.log("Initializing cart from localStorage...");
    const loadedCart = localStorage.getItem("cart");
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
      console.log("Cart is empty. Removing from localStorage.");
      localStorage.removeItem("cart"); // Remove the item
    }
  }, [state.products]);

  // Providing cart's state and dispatch through context
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
