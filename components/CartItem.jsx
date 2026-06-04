"use client";
import Image from "next/image";

const DEFAULT_IMG =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_160,h_160,c_fill/v1760384862/logo_theRoll_h293pw.png";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const imgSrc = item?.image?.trim() || DEFAULT_IMG;

  return (
    <div className="flex items-center gap-4 p-5">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[var(--color-dark)] shrink-0 border border-[var(--color-gray-border)]">
        <Image
          src={imgSrc}
          alt={item?.name || "Item"}
          fill
          className="object-cover"
          loading="lazy"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)] truncate"
            >
              {item.name}
            </h4>
            <p className="text-sm text-[var(--color-gray-muted)] mt-0.5">
              ${Number(item.price || 0).toFixed(2)}
            </p>
          </div>
          <button
            className="text-xs text-[var(--color-gray-muted)] hover:text-red-400 transition-colors shrink-0"
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
          >
            Remove
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            className="h-8 w-8 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-sm"
            onClick={onDec}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center text-[var(--color-white)] text-sm">{item.qty}</span>
          <button
            className="h-8 w-8 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-sm"
            onClick={onInc}
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="ml-auto text-sm text-[var(--color-white)]" style={{ fontFamily: "var(--font-heading)" }}>
            ${(Number(item.price || 0) * item.qty).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
