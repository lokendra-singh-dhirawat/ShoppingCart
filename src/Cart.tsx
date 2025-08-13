// Cart.tsx
import React from "react";
import { useCart } from "./CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const formatCurrency = (n: number, currency = "INR", locale = "en-IN") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    updateQuantity,
    clearCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ id is a number (matches your Product.id)
  const onChangeQty = (id: number, raw: string) => {
    const parsed = Math.floor(Number(raw));
    if (Number.isNaN(parsed)) return;
    updateQuantity(id, Math.max(1, parsed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Your Cart
          </h1>
          {cart.length > 0 && (
            <button
              onClick={() => clearCart()}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md active:scale-[0.98] transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-100">
              <span className="text-2xl">🛒</span>
            </div>
            <p className="text-lg font-semibold text-slate-800">
              Your cart is empty
            </p>
            <p className="mt-1 text-slate-500">
              Add something you love to get started.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ul className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 flex-none rounded-xl object-cover ring-1 ring-slate-200"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {item.description ?? "—"}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center rounded-xl border border-slate-200">
                          <button
                            aria-label="Decrease quantity"
                            className="p-2 transition hover:bg-slate-50 active:scale-[0.98]"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            id={`quantity-${item.id}`}
                            type="number"
                            min={1}
                            inputMode="numeric"
                            className="w-14 border-x border-slate-200 py-1.5 text-center text-sm focus:outline-none"
                            value={item.quantity}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onChangeQty(item.id, e.target.value)}
                          />
                          <button
                            aria-label="Increase quantity"
                            className="p-2 transition hover:bg-slate-50 active:scale-[0.98]"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="ml-auto text-right">
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {formatCurrency(item.price)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Subtotal:
                        <span className="ml-1 font-medium text-slate-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Order Summary
                  </h2>

                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-600">Items</dt>
                      <dd className="font-medium text-slate-900">
                        {totalItems}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-600">Subtotal</dt>
                      <dd className="font-semibold text-slate-900">
                        {formatCurrency(subtotal)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-600">Shipping</dt>
                      <dd className="text-slate-500">Calculated at checkout</dd>
                    </div>
                  </dl>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90 active:scale-[0.99]"
                    onClick={() => alert("Proceed to checkout")}
                  >
                    Checkout
                  </button>

                  <Link
                    to="/"
                    className="mt-3 block text-center text-sm font-medium text-slate-700 hover:underline"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
