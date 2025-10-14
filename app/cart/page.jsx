// app/cart/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import CartItem from "@/components/CartItem";
import {
  readCart,
  setQty,
  removeItem,
  clearCart,
  money,
} from "@/lib/cartStore";

export default function CartPage() {
  const [items, setItems] = useState([]);

  // cargar carrito del localStorage al montar
  useEffect(() => {
    setItems(readCart());
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const taxes = subtotal * 0.08; // 8% mock
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  }, [items]);

  const inc = (id) => setItems((prev) => {
    const curr = prev.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x);
    localStorage.setItem("theRoll_cart", JSON.stringify(curr));
    return curr;
  });

  const dec = (id) => setItems((prev) => {
    const curr = prev.map((x) => x.id === id ? { ...x, qty: Math.max(0, x.qty - 1) } : x)
                     .filter((x) => x.qty > 0);
    localStorage.setItem("theRoll_cart", JSON.stringify(curr));
    return curr;
  });

  const remove = (id) => {
    setItems(removeItem(id));
  };

  const empty = () => {
    clearCart();
    setItems([]);
  };

  const [checkingOut, setCheckingOut] = useState(false);
  const checkout = () => {
    if (!items.length) return;
    setCheckingOut(true);
    setTimeout(() => {
      // Mock “pago aprobado”
      clearCart();
      setItems([]);
      setCheckingOut(false);
      alert("✅ Order Confirmed! You'll receive notifications about your order.");
    }, 1200);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Cart</h1>

      {!items.length ? (
        <div className="mt-8 rounded-xl border bg-white p-8 text-center text-neutral-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista */}
          <div className="lg:col-span-2 rounded-xl border bg-white p-4">
            {items.map((it) => (
              <CartItem
                key={it.id}
                item={it}
                onInc={() => inc(it.id)}
                onDec={() => dec(it.id)}
                onRemove={() => remove(it.id)}
              />
            ))}

            <div className="flex justify-end">
              <button
                className="text-sm text-neutral-500 hover:text-red-600 mt-2"
                onClick={empty}
              >
                Empty cart
              </button>
            </div>
          </div>

          {/* Resumen */}
          <aside className="rounded-xl border bg-white p-5 h-fit">
            <h2 className="font-medium text-neutral-800 mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>{money(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Taxes (8%)</span>
                <span>{money(totals.taxes)}</span>
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{money(totals.total)}</span>
              </div>
            </div>

            <button
              disabled={!items.length || checkingOut}
              onClick={checkout}
              className="mt-5 w-full h-11 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {checkingOut ? "Processing..." : "Checkout"}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
