import { Link } from '@remix-run/react';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <nav className="py-4">
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/cart">Open Cart</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
