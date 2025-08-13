import Home from "./Home.tsx";
import Product from "./Product.tsx";
import Cart from "./Cart.tsx";
import ProductDetails from "./ProductDetails.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Product",
    element: <Product />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
];

export default routes;
