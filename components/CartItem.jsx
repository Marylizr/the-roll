// components/CartItem.jsx
"use client";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const DEFAULT_IMG =
    "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1760384862/logo_theRoll_h293pw.png";

  const imgSrc =
    item?.image && String(item.image).trim().length > 0
      ? item.image
      : DEFAULT_IMG;

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-20 w-20 overflow-hidden rounded-md bg-neutral-100">
        <img
          src={imgSrc}
          alt={item?.name || "Item"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-medium text-neutral-800">{item.name}</h4>
            <p className="text-sm text-neutral-500">
              ${Number(item.price || 0).toFixed(2)}
            </p>
          </div>
          <button
            className="text-sm text-neutral-500 hover:text-red-600"
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
          >
            Remove
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            className="h-8 w-8 rounded-full border grid place-content-center hover:bg-neutral-50"
            onClick={onDec}
            aria-label="Decrease"
          >
            −
          </button>
          <span className="w-8 text-center">{item.qty}</span>
          <button
            className="h-8 w-8 rounded-full border grid place-content-center hover:bg-neutral-50"
            onClick={onInc}
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
