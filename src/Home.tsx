import { Button } from "./components/ui/button";
import { ShoppingCart } from "lucide-react";
import CarouselDemo from "./components/carousel-demo";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="navbar">
        <h1>Shop Now!</h1>
        <Link to="/Cart">
          <Button>
            Cart <ShoppingCart />
          </Button>
        </Link>
      </div>

      <div className="CarouselImages">
        <CarouselDemo />
      </div>

      <div className="home-heading">
        <h1 className="text-8xl text-black tracking-tighter text-balance">
          This is an awesome website to buy awesome products! <br /> <br />
        </h1>
      </div>

      <div className="home-content">
        <h4 className="text-base text-white">
          Checkout our awesome products! <br />
          And, awesome discounts!
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          accusantium in repellat autem non quam hic, facere ipsam laborum ullam
          molestiae consequuntur error quibusdam labore placeat deserunt.
          Quidem, qui maxime.
        </h4>
      </div>

      <div className="buyNow">
        <div className="text-center">
          <Link to="/Product">
            <Button>Buy Now!</Button>
          </Link>
        </div>
      </div>

      <div className="footer_home">
        <Footer />
      </div>
    </>
  );
};

export default Home;
