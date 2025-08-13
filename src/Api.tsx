import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import ProductCard from "./components/productCard";
import type { Product } from "./types/Product";

export default function Api() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        if (alive) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl bg-white/60 p-4 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10"
          >
            <div className="mb-4 aspect-[4/5] rounded-xl bg-black/5 dark:bg-white/10" />
            <div className="mb-2 h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
            <div className="mb-4 h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />
            <div className="h-10 w-full rounded bg-black/10 dark:bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={(prod) => addToCart({ ...prod, quantity: 1 })}
        />
      ))}
    </div>
  );
}
