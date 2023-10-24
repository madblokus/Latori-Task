// Import necessary modules and components
import React from "react";
import { useCart } from "../../contexts/CartContext";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

// Define the Cart functional component
const Cart: React.FC = () => {
  // Destructure state and dispatch function from the CartContext
  const { state, dispatch } = useCart();

  // Function to handle removing a product from the cart
  const handleRemove = (productId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  return (
    <div className="w-full m-auto flex-col pb-4">
      <h2 className="border-b-2 pb-2 w-full ">Your Cart</h2>

      {/* Container for cart items */}
      <div className="flex flex-col w-full justify-between m-auto max-w-none py-4 overflow-x-auto max-h-[500px]">
        {/* Iterating through each product in the cart state */}
        {state.products.map((product, index) => (
          <div key={product.id} className="w-full py-4">
            <div className="flex border p-4 rounded shadow gap-4">
              <div className="w-[100px] h-auto">
                {/* Displaying product image if available */}
                {product?.images?.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={`Product ${product.id}`}
                    className="w-full h-full object-cover mb-4"
                  />
                )}
              </div>

              <div className="flex flex-col w-full justify-between">
                {/* Displaying product details */}
                <Typography variant="heading">{product.title}</Typography>
                <Typography variant="description">
                  ${product.price * product.quantity}
                </Typography>
                <Typography variant="description">
                  Qty: {product.quantity}
                </Typography>
              </div>

              {/* Remove button to remove product from cart */}
              <Button
                className="uppercase m-auto"
                onClick={() => handleRemove(product.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Cart component
export default Cart;
