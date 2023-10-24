import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "./tailwind.css";
import Layout from "./layout/layout";
import { CartProvider } from "./contexts/CartContext";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
];

const App = () => {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider>
          <Layout>
            <Outlet />
          </Layout>
          <Scripts />
          <LiveReload />
        </CartProvider>
      </body>
    </html>
  );
};

export default App;
