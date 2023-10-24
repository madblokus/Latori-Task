// Import necessary modules from Remix and React
import { Link } from "@remix-run/react";
import { useState } from "react";
import Cart from "../routes/cart";

// The Layout component which will wrap around the main content
const Layout = ({ children }: { children: React.ReactNode }) => {
  // State to manage if the Cart should be displayed or not
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to toggle Cart open/closed
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full">
      {/* Navigation bar */}
      <nav className="bg-black w-full text-white py-4">
        <div className="flex justify-between m-auto max-w-none lg:max-w-5xl px-16">
          {/* Link to the Product List page */}
          <Link to="/" className="mr-4">
            Product List
          </Link>

          {/* Button to toggle the Cart */}
          <button onClick={toggleCart}>Open Cart</button>

          {/* Conditional rendering of the Cart */}
          {isCartOpen && (
            <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white text-black inset-0 flex items-center justify-center z-50 w-[800px] h-[600px]">
              <div className="w-full h-full p-8 relative rounded-lg text-cl">
                {/* Actual Cart component */}
                <Cart />

                {/* Close Cart button */}
                <button className="absolute top-8 right-8" onClick={toggleCart}>
                  Close Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content, which will be wrapped by this Layout */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
