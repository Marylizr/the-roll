"use client";
import { useEffect, useMemo, useState } from "react";

export default function OrderPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [offsets, setOffsets] = useState({}); // { suggestions: 0, makis: 0, ... }

  // Cargar productos del JSON público
  useEffect(() => {
    fetch("/items.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((json) => setItems(json || []))
      .catch(() => setItems([]));
  }, []);

  // Filtro por búsqueda
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(
      (it) =>
        it.name.toLowerCase().includes(term) ||
        it.tag?.toLowerCase().includes(term)
    );
  }, [q, items]);

  // Agrupar por tag y ordenar como en el mock
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

  // Avanzar carrusel (paso de 1)
  const advance = (tag, step = 1) => {
    setOffsets((prev) => {
      const current = prev[tag] || 0;
      return { ...prev, [tag]: current + step };
    });
  };

  return (
    <section className="space-y-8">
      {/* Search centrado */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 rounded-full border px-4 pr-10 shadow-sm"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-3.6-3.6" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Secciones */}
      {Object.entries(groups).map(([tag, list]) => (
        <Category
          key={tag}
          title={labelFor(tag)}
          tag={tag}
          list={list}
          offset={offsets[tag] || 0}
          onNext={() => advance(tag, 1)}
        />
      ))}
    </section>
  );
}

/* ---------- Helpers ---------- */
function labelFor(tag) {
  if (tag === "suggestions") return "Sugestions";
  if (tag === "makis") return "Makis";
  if (tag === "beverages") return "Beverages";
  if (tag === "sashimi") return "Sashimis";
  return tag[0].toUpperCase() + tag.slice(1);
}

function Category({ title, tag, list, offset, onNext }) {
  if (!list?.length) return null;

  // Duplico la lista para simular carrusel infinito
  const looped = [...list, ...list];
  const start = offset % looped.length;
  const visible = looped.slice(start, start + 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onNext}
          className="rounded-full border w-8 h-8 grid place-content-center text-neutral-600 hover:bg-neutral-50"
          aria-label={`Next ${title}`}
          title="Next"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200">
        {visible.map((it, idx) => (
          <Card key={`${tag}-${it.id}-${start}-${idx}`} it={it} />
        ))}
      </div>
    </div>
  );
}

function Card({ it }) {
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("theRoll_cart") || "[]");
    cart.push({ ...it, qty });
    localStorage.setItem("theRoll_cart", JSON.stringify(cart));
    alert("Order Confirmed!");
  };

  const price = Number(it.price || 0);
  const total = price * qty;

  return (
    <article className="rounded-2xl border bg-white shadow-sm overflow-visible">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-neutral-100">
        <img
          src={it.img}
          alt={it.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        {/* Título izquierda / precio derecha */}
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide leading-snug max-w-[75%]">
            {it.name}
          </h3>
          <span className="text-neutral-700 font-semibold">{price}$</span>
        </div>

        {/* Controles centrados (– qty +) con tus íconos */}
        <div className="mt-3 flex items-center justify-center gap-3 text-sm">
          <button
            type="button"
            className=" rounded-full  shadow-sm shadow-black/5 ring-1 ring-black/5 grid place-content-center hover:bg-neutral-50"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease"
            title="Decrease"
          >
            <img
              src="https://res.cloudinary.com/da6il8qmv/image/upload/v1760377300/minus_ovf0n3.svg"
              alt="minus"
              className="w-8 h-8"
            />
          </button>

          <span className="w-6 text-center">{qty}</span>

          <button
            type="button"
            className=" rounded-full  shadow-sm shadow-black/5 ring-1 ring-black/5 grid place-content-center hover:bg-neutral-50"
            onClick={() => setQty((n) => Math.min(99, n + 1))}
            aria-label="Increase"
            title="Increase"
          >
            <img
              src="https://res.cloudinary.com/da6il8qmv/image/upload/v1760377301/plus_cmmonx.svg"
              alt="plus"
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* CTA centrado, redondeado y sin corte de sombra */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={addToCart}
            className="w-full sm:w-auto px-5 h-11 rounded-full border text-red-600 border-red-300 shadow-sm shadow-black/5 ring-1 ring-red-200/60 hover:bg-red-50"
          >
            add {qty} to Cart • {total}$
          </button>
        </div>
      </div>
    </article>
  );
}
