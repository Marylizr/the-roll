"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function OrderPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [offsets, setOffsets] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch("/items.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((json) => setItems(json || []))
      .catch(() => setItems([]));
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (it) => it.name.toLowerCase().includes(term) || it.tag?.toLowerCase().includes(term)
    );
  }, [q, items]);

  const groups = useMemo(() => {
    const g = filtered.reduce((acc, it) => {
      const k = it.tag || "others";
      (acc[k] ||= []).push(it);
      return acc;
    }, {});
    const order = ["suggestions", "makis", "beverages", "sashimi", "others"];
    const sorted = {};
    order.forEach((k) => g[k] && (sorted[k] = g[k]));
    return sorted;
  }, [filtered]);

  const advance = (tag, step = 1) => {
    setOffsets((prev) => {
      const current = prev[tag] || 0;
      return { ...prev, [tag]: current + step };
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <section className="pb-20">
      {/* Header */}
      <div className="bg-[var(--color-dark-alt)] border-b border-[var(--color-gray-border)] py-16 px-6 text-center">
        <h1
          className="text-[var(--color-accent)] font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Order Online
        </h1>
        <div className="section-divider" />
        <p className="text-[var(--color-gray-muted)]">
          Browse our full menu and add items to your cart
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Search */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search menu..."
              className="w-full h-11 rounded-full border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] px-5 pr-11 text-[var(--color-white)] placeholder:text-[var(--color-gray-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-muted)]"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-3.6-3.6" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {Object.entries(groups).map(([tag, list]) => (
          <Category key={tag} title={labelFor(tag)} tag={tag} list={list} offset={offsets[tag] || 0} onNext={() => advance(tag, 1)} onToast={showToast} />
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-accent)] text-[var(--color-black)] px-6 py-3 rounded-full text-sm font-medium shadow-2xl animate-fade-up">
          {toast}
        </div>
      )}
    </section>
  );
}

function labelFor(tag) {
  const map = { suggestions: "Suggestions", makis: "Makis", beverages: "Beverages", sashimi: "Sashimis" };
  return map[tag] || (tag[0].toUpperCase() + tag.slice(1));
}

function Category({ title, list, offset, onNext, onToast }) {
  if (!list?.length) return null;
  const looped = [...list, ...list];
  const start = offset % looped.length;
  const visible = looped.slice(start, start + 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[var(--color-accent)] rounded-full" />
          <h2
            className="text-lg tracking-[0.1em] uppercase text-[var(--color-white)]"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            {title}
          </h2>
        </div>
        <button
          onClick={onNext}
          className="h-9 w-9 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-gray-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          aria-label={`Next ${title}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((it, idx) => (
          <Card key={`${it.id}-${start}-${idx}`} it={it} onToast={onToast} />
        ))}
      </div>
    </div>
  );
}

function Card({ it, onToast }) {
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("theRoll_cart") || "[]");
    const existing = cart.findIndex((x) => x.id === it.id);
    if (existing >= 0) cart[existing].qty += qty;
    else cart.push({ ...it, qty });
    localStorage.setItem("theRoll_cart", JSON.stringify(cart));
    onToast(`${it.name} added to cart`);
  };

  const price = Number(it.price || 0);
  const total = price * qty;

  return (
    <article className="menu-card">
      <div className="menu-card-image-wrapper aspect-[4/3] w-full">
        <Image
          src={it.img || ""}
          alt={it.name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)] leading-snug max-w-[75%]"
          >
            {it.name}
          </h3>
          <span
            className="text-lg font-light text-[var(--color-white)] shrink-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ${price}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-3">
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor"><path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <span className="w-6 text-center text-[var(--color-white)]">{qty}</span>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            onClick={() => setQty((n) => Math.min(99, n + 1))}
            aria-label="Increase quantity"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <button
          onClick={addToCart}
          className="btn-outline w-full text-xs tracking-wide"
        >
          Add {qty} to Cart · ${total}
        </button>
      </div>
    </article>
  );
}
