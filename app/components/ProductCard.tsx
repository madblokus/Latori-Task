// Import necessary dependencies
import React, { useState } from "react";
import Button from "./Button";
import { useCart } from "../contexts/CartContext";

// Define the props type for the ProductCard component
type ProductCardProps = {
  id: string;
  title: string;
  images: string[];
  price: string;
  children: React.ReactNode;
};

// Define the ProductCard functional component
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  images,
  price,
  children,
}) => {
  // State to keep track of the current displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Access the CartContext dispatch function
  const { dispatch } = useCart();

  // Function to add the product to the cart
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        title,
        price: parseFloat(price),
        images,
        quantity: 1,
      },
    });
  };

  // Function to show the next image in the array
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to show the previous image in the array
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Render the product card
  return (
    <div className="border p-4 flex flex-row lg:flex-col rounded-md gap-4 lg:gap-0 justify-between lg:justify-normal">
      <div className="relative">
        <div className="w-[240px] lg:w-full">
          <img
            src={images[currentImageIndex]}
            alt={`Product ${currentImageIndex + 1}`}
            className="lg:w-full h-auto lg:h-60 object-cover lg:mb-4"
          />
        </div>
        {/* Previous and Next buttons to navigate through product images */}
        <button
          onClick={prevImage}
          className="absolute transform translate-x-1/2 -translate-y-1/2 left-0 top-1/2 bg-gray-700 text-white p-1 lg:p-2 rounded-full opacity-60 hover:opacity-100"
        >
          {"<"}
        </button>
        <button
          onClick={nextImage}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 right-0 top-1/2 bg-gray-700 text-white p-1 lg:p-2 rounded-full opacity-60 hover:opacity-100"
        >
          {">"}
        </button>
      </div>
      {/* Content section (could be title, price, etc.) */}
      <div className="w-full mb-4 min-h-0 lg:min-h-[80px]">{children}</div>
      {/* Add to Cart Button */}
      <div className="m-auto lg:m-0">
        <Button className="w-72 lg:w-full uppercase block" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

// Export the ProductCard component for use in other files
export default ProductCard;
