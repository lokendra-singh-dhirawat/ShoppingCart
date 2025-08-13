import React, { createContext, useState, useContext } from "react";
import { toast } from "sonner";

type ID = number;

export type Product = {
  id: ID;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
  category?: string;
};

export type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: ID) => void;
  decrementQuantity: (productId: ID) => void;
  incrementQuantity: (productId: ID) => void;
  updateQuantity: (id: ID, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const clampQty = (n: number) =>
  Math.max(1, Math.floor(Number.isFinite(n) ? n : 1));

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart: CartContextType["addToCart"] = (product) => {
    // Was this item already in the cart?
    const existed = cart.some((i) => i.id === product.id);

    setCart((prevCart) => {
      const idx = prevCart.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...prevCart];
        next[idx] = {
          ...next[idx],
          quantity: clampQty(next[idx].quantity + (product.quantity || 1)),
        };
        return next;
      }
      // If product.quantity is missing/0/NaN, clampQty → 1
      return [
        ...prevCart,
        { ...product, quantity: clampQty(product.quantity) },
      ];
    });

    // Toast outside setState to avoid side-effects inside
    if (existed) {
      toast.message(`Updated quantity`, {
        description: `${product.title} quantity increased`,
      });
    } else {
      toast.success(`Added to cart`, {
        description: product.title,
      });
    }
  };

  const removeFromCart: CartContextType["removeFromCart"] = (productId) => {
    const removed = cart.find((i) => i.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (removed) {
      toast.success(`Removed from cart`, { description: removed.title });
    }
  };

  const decrementQuantity: CartContextType["decrementQuantity"] = (
    productId
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
    // No toast here to avoid spam on rapid clicks
  };

  const incrementQuantity: CartContextType["incrementQuantity"] = (
    productId
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    // No toast here to avoid spam
  };

  const updateQuantity: CartContextType["updateQuantity"] = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: clampQty(qty) } : item
      )
    );
    const updated = cart.find((i) => i.id === id);
    if (updated) {
      toast.message(`Quantity updated`, {
        description: `${updated.title} → ${clampQty(qty)}`,
      });
    }
  };

  const clearCart: CartContextType["clearCart"] = () => {
    if (cart.length === 0) return;
    setCart([]);
    toast.warning(`Cart cleared`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        incrementQuantity,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
