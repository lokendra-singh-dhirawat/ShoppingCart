import { Link, Outlet } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./components/ui/button";
import Api from "./Api.tsx";
import Footer from "./Footer.tsx";
import { useCart } from "./CartContext.tsx";
import { Toaster } from "sonner";

const Product = () => {
  const { cart } = useCart();

  return (
    <div>
      <div className="navForProducts">
        <div className="logo">
          <h1>Shop Now!</h1>
        </div>

        <div className="ButtonsOfNav">
          <Button asChild className="cart-button">
            <Link to="/cart">
              <ShoppingCart /> Cart
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      <div className="products">
        <Api />
      </div>

      <div className="footerForProducts">
        <Footer />
      </div>

      <Outlet />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Product;
