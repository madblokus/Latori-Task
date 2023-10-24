import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { useState } from "react";
import Cart from "./cart";

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

export default function ProductsList(props: any) {
  const { products } = useLoaderData<typeof loader>();
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState(products);

  const loadMoreProducts = async () => {
    const newOffset = offset + 6;
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=6`);
    const newProducts = await response.json();
    setAllProducts([...allProducts, ...newProducts]);
    setOffset(newOffset);
  };

  return (
    <div className="w-full m-auto flex items-center flex-col pb-4">
      <div className="flex flex-col w-full lg:flex-row lg:w-full flex-wrap justify-between m-auto max-w-none lg:max-w-5xl px-8 py-4">
        {allProducts.map((product: any) => (
          <div key={product.id} className="w-full lg:w-1/3 px-4 py-4">
            <ProductCard id={product.id} images={product.images}>
              <Typography variant="heading">{product.title}</Typography>
              <Typography variant="description">${product.price}</Typography>
            </ProductCard>
          </div>
          
        ))}
        <Cart />
      </div>
      <Button className="w-[300px] uppercase" onClick={loadMoreProducts}>
        Load More
      </Button>
    </div>
  );
}


