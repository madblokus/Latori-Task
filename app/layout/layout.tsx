import { Link } from "@remix-run/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <nav className="bg-black w-full text-white py-4">
        <div className="flex justify-between m-auto max-w-none lg:max-w-5xl px-16">
          <Link to="/" className="mr-4">
            Product List
          </Link>
          <button>Open Cart</button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
