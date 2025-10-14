"use client";
import { useMemo, useState } from "react";

/* ========= Imágenes ========= */
const BANNER =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377293/banner-location_vacz8h.png";
const G1 =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760462800/galery-restaurant_iifrlf.png";
const G2 =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760462800/galery-restaurant2_n6uw1v.png";

/* Galería (3 imágenes) */
const GALLERY = [
  { src: BANNER, caption: "Beautiful and enchanting decoration to feel like in Okinawa" },
  { src: G1, caption: "Beautiful and enchanting decoration to feel like in Okinawa" },
  { src: G2, caption: "Beautiful and enchanting decoration to feel like in Okinawa" },
];

export default function LocationsPage() {
  return (
    <section className="pb-16">
      {/* ===== Tarjeta principal ===== */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] bg-white">
          {/* Imagen principal */}
          <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-200">
            <img src={BANNER} alt="The Roll Westbury interior" className="w-full h-full object-cover" />
          </div>

          {/* Panel inferior */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_.9fr] gap-6 lg:gap-8 p-6 lg:p-8 bg-white">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <InfoRow
                icon={<PinIcon className="h-5 w-5 text-neutral-500" />}
                label={
                  <>
                    <span className="font-medium text-neutral-800">Westbury, NY</span>
                    <br />
                    920 Merchants Concourse
                    <br />
                    Westbury, NY 11590
                  </>
                }
              />
              <InfoRow
                icon={<WhatsAppIcon className="h-5 w-5 text-neutral-500" />}
                label={
                  <>
                    <span className="font-medium text-neutral-800">PHONE:</span> (516) 780-0892
                  </>
                }
              />
              <InfoRow icon={<InstagramIcon className="h-5 w-5 text-neutral-500" />} label={<span>@theRoll_NYC</span>} />
              <InfoRow icon={<TiktokIcon className="h-5 w-5 text-neutral-500" />} label={<span>@theRoll_NYC</span>} />
              <InfoRow icon={<MailIcon className="h-5 w-5 text-neutral-500" />} label={<span>hello@theroll.com</span>} />
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-neutral-200 p-5">
                <h4 className="text-sm font-medium text-neutral-700">Customer’s Reviews</h4>
                <hr className="my-3 border-neutral-200" />
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-neutral-800 leading-none">4,7</span>
                  <span className="text-neutral-500 mb-0.5">/ 5</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <StarFilled className="h-5 w-5 text-red-600" />
                  <StarFilled className="h-5 w-5 text-red-600" />
                  <StarFilled className="h-5 w-5 text-red-600" />
                  <StarFilled className="h-5 w-5 text-red-600" />
                  <StarHalf className="h-5 w-5 text-red-600" />
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  <span className="font-medium">Woking hours:</span>
                  <br />
                  Monday to Sunday
                  <br />
                  12:00 - 04:00 pm | 07:00 - 11:00 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Carrusel inferior ===== */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <GalleryCarousel images={GALLERY} />
      </div>

      {/* Footer fino */}
      <div className="mt-12 text-center text-xs text-neutral-500">
        The Roll SL All Rights Reserved, a Sushi Company 2020
      </div>
    </section>
  );
}

/* =================== Carrusel =================== */
function GalleryCarousel({ images }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  // Tres visibles: idx, idx+1, idx+2 (circular)
  const visible = useMemo(() => {
    const i1 = (idx + 1) % total;
    const i2 = (idx + 2) % total;
    return [images[idx], images[i1], images[i2]];
  }, [idx, images, total]);

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative z-0"> {/* stacking context del carrusel */}
      {/* Flecha izquierda (por encima de las cards) */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="hidden md:grid place-content-center absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow hover:bg-neutral-50 z-40 pointer-events-auto"
      >
        ‹
      </button>

      {/* Flecha derecha (por encima de las cards) */}
      <button
        aria-label="Next"
        onClick={next}
        className="hidden md:grid place-content-center absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow hover:bg-neutral-50 z-40 pointer-events-auto"
      >
        ›
      </button>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map((item, i) => (
          <figure
            key={`${idx}-${i}`}
            className="relative z-10 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            <div className="relative">
              <img src={item.src} alt={`Gallery ${i + 1}`} className="w-full h-56 md:h-64 object-cover" />

              {/* En móvil, flechas sobre la tarjeta central */}
              {i === 1 && (
                <div className="md:hidden">
                  <button
                    aria-label="Previous"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-content-center h-9 w-9 rounded-full bg-white/90 shadow hover:bg-white z-40 pointer-events-auto"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-content-center h-9 w-9 rounded-full bg-white/90 shadow hover:bg-white z-40 pointer-events-auto"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
            <figcaption className="px-6 py-4 text-center text-[13px] text-neutral-600">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ============== Pequeños componentes/íconos ============== */
function InfoRow({ icon, label }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-full bg-neutral-100 grid place-content-center">{icon}</div>
      <p className="text-sm text-neutral-700 leading-relaxed">{label}</p>
    </div>
  );
}

function StarFilled({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
function StarHalf({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 15.4V5.1l1.71 3.53 3.89.33-2.96 2.56.9 3.82zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z" />
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.2 6.38 2.2 11.84c0 2.08.62 4 1.68 5.62L2 22l4.7-1.83a9.77 9.77 0 0 0 5.34 1.56c5.46 0 9.84-4.38 9.84-9.84S17.5 2 12.04 2zm.02 17.6c-1.86 0-3.6-.6-5.02-1.62l-.36-.26-2.78 1.08 1.06-2.7-.26-.38a8.02 8.02 0 1 1 7.36 3.88zm4.46-5.2c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.36-1.9-1.14-.7-.6-1.18-1.32-1.32-1.56-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.08 3.48.57.24 1.02.38 1.36.48.57.18 1.08.16 1.48.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}
function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.8-2.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  );
}
function TiktokIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21 8.5c-2.2 0-4.2-1.1-5.4-2.8V17a5 5 0 1 1-5-5c.35 0 .69.03 1 .1V9.1a7 7 0 1 0 7 7V9.7c.9.5 1.9.8 3 .8V8.5z" />
    </svg>
  );
}
function MailIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
