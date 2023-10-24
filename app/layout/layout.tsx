import { Link } from "@remix-run/react";
import { useState } from "react";
import Cart from "../routes/cart";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full">
      <nav className="bg-black w-full text-white py-4">
        <div className="flex justify-between m-auto max-w-none lg:max-w-5xl px-16">
          <Link to="/" className="mr-4">
            Product List
          </Link>
          <button onClick={toggleCart}>Open Cart</button>
          {isCartOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg">
                <Cart />
                <button onClick={toggleCart}>Close Cart</button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
