"use client";
import { useMemo, useState } from "react";
import Image from "next/image";


const BANNER = "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_1200/v1760377293/banner-location_vacz8h.png";
const G1 = "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760462800/galery-restaurant_iifrlf.png";
const G2 = "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760462800/galery-restaurant2_n6uw1v.png";

const GALLERY = [
  { src: BANNER, caption: "A serene atmosphere inspired by Okinawa's natural beauty" },
  { src: G1,     caption: "Intimate dining rooms crafted for memorable occasions" },
  { src: G2,     caption: "Every detail designed to transport you to Japan" },
];

export default function LocationsPage() {
  return (
    <section className="pb-20">
      {/* Page header */}
      <div className="bg-[var(--color-dark-alt)] border-b border-[var(--color-gray-border)] py-16 px-6 text-center">
        <h1
          className="text-[var(--color-accent)] font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Our Location
        </h1>
        <div className="section-divider" />
        <p className="text-[var(--color-gray-muted)]">
          Westbury, New York
        </p>
      </div>

      {/* Location card */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-3xl overflow-hidden border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] shadow-2xl">
          {/* Main image */}
          <div className="aspect-[16/9] w-full overflow-hidden">
            <Image
              src={BANNER}
              alt="The Roll Westbury interior"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Info panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 p-6 lg:p-8">
            {/* Left */}
            <div className="space-y-4">
              <InfoRow icon={<PinIcon />} label={<><strong className="text-[var(--color-white)]">Westbury, NY</strong><br />920 Merchants Concourse<br />Westbury, NY 11590</>} />
              <InfoRow icon={<PhoneIcon />} label={<><span className="text-[var(--color-accent)]">(516) 780-0892</span></>} />
              <InfoRow icon={<InstagramIcon />} label={<span>@theRoll_NYC</span>} />
              <InfoRow icon={<TiktokIcon />} label={<span>@theRoll_NYC</span>} />
              <InfoRow icon={<MailIcon />} label={<span>hello@theroll.com</span>} />
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark)] p-5">
                <h4 className="text-xs tracking-widest uppercase text-[var(--color-gray-muted)] mb-3">
                  Customer Reviews
                </h4>
                <div className="flex items-end gap-2 mb-2">
                  <span
                    className="text-3xl font-light text-[var(--color-white)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    4.7
                  </span>
                  <span className="text-[var(--color-gray-muted)] mb-0.5">/ 5</span>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => <StarFilled key={i} />)}
                  <StarHalf />
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark)] p-5">
                <h4 className="text-xs tracking-widest uppercase text-[var(--color-gray-muted)] mb-3">
                  Hours
                </h4>
                <p className="text-[var(--color-gray-muted)] text-sm leading-relaxed">
                  Monday – Sunday<br />
                  <span className="text-[var(--color-accent)]">12:00 – 4:00 PM</span><br />
                  <span className="text-[var(--color-accent)]">7:00 – 11:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery carousel */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <h2
          className="text-center text-[var(--color-accent)] font-light mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Gallery
        </h2>
        <GalleryCarousel images={GALLERY} />
      </div>
    </section>
  );
}

function GalleryCarousel({ images }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const visible = useMemo(() => {
    return [images[idx], images[(idx + 1) % total], images[(idx + 2) % total]];
  }, [idx, images, total]);

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative">
      <button
        aria-label="Previous"
        onClick={prev}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] items-center justify-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors z-10"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] items-center justify-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors z-10"
      >
        ›
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((item, i) => (
          <figure key={`${idx}-${i}`} className="rounded-2xl overflow-hidden border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] shadow-lg relative">
            <div className="relative">
              <Image
                src={item.src}
                alt={item.caption}
                width={700}
                height={450}
                className="w-full h-56 md:h-64 object-cover"
                loading="lazy"
              />
              {i === 1 && (
                <div className="md:hidden absolute inset-0 flex items-center justify-between px-3">
                  <button onClick={prev} className="h-9 w-9 rounded-full bg-black/50 flex items-center justify-center text-white" aria-label="Previous">‹</button>
                  <button onClick={next} className="h-9 w-9 rounded-full bg-black/50 flex items-center justify-center text-white" aria-label="Next">›</button>
                </div>
              )}
            </div>
            <figcaption className="px-5 py-3 text-center text-xs text-[var(--color-gray-muted)] leading-relaxed">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ icon, label }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-full border border-[var(--color-gray-border)] bg-[var(--color-dark)] grid place-content-center text-[var(--color-accent)] shrink-0">
        {icon}
      </div>
      <p className="text-sm text-[var(--color-gray-muted)] leading-relaxed pt-1">{label}</p>
    </div>
  );
}

function StarFilled() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-accent)]" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;
}
function StarHalf() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--color-accent)]" fill="currentColor"><path d="M12 15.4V5.1l1.71 3.53 3.89.33-2.96 2.56.9 3.82zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z" /></svg>;
}
function PinIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>;
}
function PhoneIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z" /></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.8-2.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>;
}
function TiktokIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M21 8.5c-2.2 0-4.2-1.1-5.4-2.8V17a5 5 0 1 1-5-5c.35 0 .69.03 1 .1V9.1a7 7 0 1 0 7 7V9.7c.9.5 1.9.8 3 .8V8.5z" /></svg>;
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>;
}
