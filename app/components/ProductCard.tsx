import React, { useState } from "react";
import Button from "./Button";
import { useCart } from "../contexts/CartContext";

type ProductCardProps = {
  id: string;
  images: string[];
  children: React.ReactNode;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, images, children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, quantity: 1 } });
  };


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      key={id}
      className="border p-4 flex flex-row lg:flex-col rounded-md gap-4 lg:gap-0 justify-between lg:justify-normal"
    >
      <div className="relative">
        <div className="w-[240px]">
          <img
            src={images[currentImageIndex]}
            alt={`Product ${currentImageIndex + 1}`}
            className="w-[240px] lg:w-full h-auto lg:h-60 object-cover lg:mb-4"
          />
        </div>
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
      <div className="mb-4">{children}</div>
      <div className="m-auto lg:m-0">
        <Button
          className="w-72 lg:w-full uppercase block"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
