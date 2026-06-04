"use client";
import { useEffect, useMemo, useState } from "react";
import CartItem from "@/components/CartItem";
import { readCart, removeItem, clearCart, money } from "@/lib/cartStore";


export default function CartPage() {
  const [items, setItems] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => { setItems(readCart()); }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const taxes = subtotal * 0.08;
    return { subtotal, taxes, total: subtotal + taxes };
  }, [items]);

  const sync = (next) => {
    setItems(next);
    localStorage.setItem("theRoll_cart", JSON.stringify(next));
  };

  const inc = (id) => sync(items.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  const dec = (id) => sync(items.map((x) => x.id === id ? { ...x, qty: Math.max(0, x.qty - 1) } : x).filter((x) => x.qty > 0));
  const remove = (id) => sync(removeItem(id));
  const empty = () => { clearCart(); setItems([]); };

  const checkout = () => {
    if (!items.length) return;
    setCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setItems([]);
      setCheckingOut(false);
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 4000);
    }, 1400);
  };

  return (
    <section className="pb-20">
      {/* Header */}
      <div className="bg-[var(--color-dark-alt)] border-b border-[var(--color-gray-border)] py-16 px-6 text-center">
        <h1
          className="text-[var(--color-accent)] font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Your Cart
        </h1>
        <div className="section-divider" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!items.length ? (
          <div className="mt-8 rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] p-12 text-center text-[var(--color-gray-muted)]">
            <p className="text-lg mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Your cart is empty
            </p>
            <a href="/menu" className="btn-outline text-sm">Browse Menu</a>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2 rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] overflow-hidden">
              <div className="divide-y divide-[var(--color-gray-border)]">
                {items.map((it) => (
                  <CartItem
                    key={it.id}
                    item={it}
                    onInc={() => inc(it.id)}
                    onDec={() => dec(it.id)}
                    onRemove={() => remove(it.id)}
                  />
                ))}
              </div>
              <div className="flex justify-end px-5 py-3 border-t border-[var(--color-gray-border)]">
                <button
                  className="text-xs text-[var(--color-gray-muted)] hover:text-red-400 transition-colors"
                  onClick={empty}
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] p-6 h-fit lg:sticky lg:top-20">
              <h2
                className="text-[var(--color-white)] mb-4"
                style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem" }}
              >
                Order Summary
              </h2>
              <div className="section-divider ml-0 mb-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-muted)]">Subtotal</span>
                  <span className="text-[var(--color-white)]">{money(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray-muted)]">Tax (8%)</span>
                  <span className="text-[var(--color-white)]">{money(totals.taxes)}</span>
                </div>
                <div className="border-t border-[var(--color-gray-border)] pt-3 flex justify-between font-medium">
                  <span className="text-[var(--color-white)]">Total</span>
                  <span
                    className="text-[var(--color-accent)] text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {money(totals.total)}
                  </span>
                </div>
              </div>
              <button
                disabled={!items.length || checkingOut}
                onClick={checkout}
                className="btn-primary w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {checkingOut ? "Processing..." : "Checkout"}
              </button>
            </aside>
          </div>
        )}
      </div>

      {/* Confirmation toast */}
      {confirmed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-accent)] text-[var(--color-black)] px-8 py-4 rounded-2xl text-sm font-medium shadow-2xl animate-fade-up text-center">
          <div className="font-semibold">Order Confirmed!</div>
          <div className="opacity-80">You&apos;ll receive updates about your order.</div>
        </div>
      )}
    </section>
  );
}
