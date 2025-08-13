import { StrictMode } from "react";
import { CartProvider } from "./CartContext";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/globals.css";
import routes from "./routes";

const router = createBrowserRouter(routes);
  
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
    </StrictMode>
);
