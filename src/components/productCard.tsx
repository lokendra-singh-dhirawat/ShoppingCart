import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, ArrowRight, Star } from "lucide-react";
import type { Product } from "../types/Product";

type Props = {
  product: Product;
  onAdd: (p: Product) => void;
};

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-black">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 fill-black" />
      ))}
      {hasHalf && (
        <Star className="h-4 w-4 [clip-path:inset(0_50%_0_0)] fill-black" />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 opacity-20" />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-xl bg-white
        ring-1 ring-black/10 shadow-sm transition
        hover:-translate-y-0.5 hover:shadow-md hover:ring-black/20
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {/* subtle neutral fade, still grayscale */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-black">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-black">
            ${product.price}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Stars value={product.rating?.rate ?? 0} />
            <span>({product.rating?.count ?? 0})</span>
          </div>
        </div>

        <div className="mt-0.5 line-clamp-2 text-xs text-gray-600">
          {product.description}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button
            className="flex-1 bg-black text-white hover:bg-black/90"
            onClick={() => onAdd(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          {/* neutral outline button, no color */}
          <Button
            asChild
            variant="ghost"
            className="border border-black text-black hover:bg-black hover:text-white"
          >
            <Link to={`/product/${product.id}`}>
              View <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
