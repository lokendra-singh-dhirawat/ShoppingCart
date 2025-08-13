import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product, useCart } from "./CartContext";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { Toaster } from "sonner";
type ApiProduct = Omit<Product, "quantity">;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: ApiProduct = await res.json();
        if (alive) {
          setProduct({ ...data, quantity: 1 });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-4">
        <div className="animate-pulse grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-black/5 dark:bg-white/10" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-black/10 dark:bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />
            <div className="h-32 w-full rounded bg-black/10 dark:bg-white/10" />
            <div className="h-10 w-40 rounded bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="p-4">Product not found.</div>;

  const handleAdd = () => {
    addToCart(product);
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-auto max-h-[520px] w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="text-3xl font-bold">${product.price}</div>
          <div className="text-sm text-muted-foreground">
            Category: {product.category ?? "—"}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleAdd}
              className="bg-black text-white hover:bg-black/90"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
