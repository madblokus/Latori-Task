// Import necessary modules and components
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useState } from "react";

// Loader function to fetch initial product data from the API
export const loader = async () => {
  const response = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=6"
  );
  const rawData: Product[] = await response.json();
  const products = rawData.map(({ id, images, title, price }) => ({
    id,
    images,
    title,
    price,
  }));
  return json({ products });
};

// Main ProductsList component
export default function ProductsList(props: any) {
  // Load initial products using Remix's loader data
  const { products } = useLoaderData<typeof loader>();

  // State variables for pagination and product list
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState(products);

  // Function to load more products from the API
  const loadMoreProducts = async () => {
    const newOffset = offset + 6;
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=6`
    );
    const newProducts = await response.json();
    setAllProducts([...allProducts, ...newProducts]);
    setOffset(newOffset);
  };

  return (
    <div className="w-full m-auto flex items-center flex-col pb-4">
      <div className="flex flex-col w-full lg:flex-row lg:w-full flex-wrap justify-between m-auto max-w-none lg:max-w-5xl px-8 py-4">
        {/* Iterate over all products and display them */}
        {allProducts.map((product: any) => (
          <div key={product.id} className="w-full lg:w-1/3 px-4 py-4">
            <ProductCard
              price={product.price}
              title={product.title}
              id={product.id}
              images={product.images}
            >
              <Typography variant="heading">{product.title}</Typography>
              <Typography variant="description">${product.price}</Typography>
            </ProductCard>
          </div>
        ))}
      </div>
      {/* Load More button to fetch additional products */}
      <Button
        className="w-full lg:w-[300px] uppercase"
        onClick={loadMoreProducts}
      >
        Load More
      </Button>
    </div>
  );
}
