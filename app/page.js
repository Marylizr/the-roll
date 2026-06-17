"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BANNER = "/banner-new.png";
const LOGO_COLOR = "/logo-darkBG.webp";
const SUSHI =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_800/v1760377303/sushi2_ru7cgk.png";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Home() {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ambiance = useInView();
  const text = useInView();
  const colLeft = useInView();
  const colRight = useInView();

  return (
    <section className="w-full overflow-hidden">
      {/* ===== HERO — full viewport ===== */}
      <div className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "560px" }}>
        <div className="absolute inset-0">
          <Image
            src={BANNER}
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Hero actions */}
        <div className="absolute inset-0 z-10">
          {/* CTA buttons */}
          <div
            className={[
              "absolute left-1/2 top-[79%] flex flex-col sm:flex-row gap-3 -translate-x-1/2",
              play ? "animate-fade-up delay-500" : "opacity-0",
            ].join(" ")}
          >
            <Link href="/menu" className="btn-primary">Explore Menu</Link>
            <Link href="/booking" className="btn-outline">Reserve a Table</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest"
          style={{ color: "var(--color-gray-muted)" }}
        >
          <span>SCROLL</span>
          <div className="w-px h-8 opacity-50" style={{ backgroundColor: "var(--color-accent)" }} />
        </div>
      </div>

      {/* ===== LOGO + TAGLINE ===== */}
      <div
        ref={text.ref}
        className={[
          "max-w-5xl mx-auto px-6 py-20 text-center space-y-6",
          text.inView ? "animate-fade-up" : "opacity-0",
        ].join(" ")}
      >
        <Image
          src={LOGO_COLOR}
          alt="The Roll"
          width={560}
          height={220}
          className="mx-auto h-auto"
          style={{ width: "clamp(12.5rem, 30vw, 26.25rem)" }}
        />
        <div className="section-divider" />
        <h2
          className="font-light italic"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Tradition Meets Innovation
        </h2>
        <p className="max-w-3xl mx-auto leading-relaxed" style={{ color: "var(--color-gray-muted)" }}>
          At The Roll, we take sushi to new heights, blending centuries-old techniques with
          avant-garde creativity. Our master chefs meticulously select the freshest, sustainable
          ingredients, transforming them into edible masterpieces that tantalize the taste buds.
        </p>
      </div>

      {/* ===== ELEGANT AMBIANCE — full-bleed split ===== */}
      <div
        ref={ambiance.ref}
        className={[
          "grid grid-cols-1 lg:grid-cols-2",
          ambiance.inView ? "animate-scale-in" : "opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden" style={{ aspectRatio: "4 / 3", minHeight: "480px" }}>
          <Image
            src={SUSHI}
            alt="Signature roll"
            width={800}
            height={600}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          className="flex items-center border-l"
          style={{ backgroundColor: "var(--color-dark-alt)", borderColor: "var(--color-gray-border)" }}
        >
          <div className="p-10 md:p-14 lg:p-16 text-center lg:text-left">
            <h2
              className="font-light italic"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Elegant Ambiance
            </h2>
            <div className="section-divider lg:ml-0" />
            <p className="leading-relaxed max-w-xl" style={{ color: "var(--color-gray-muted)" }}>
              Step into a serene oasis where contemporary design harmonizes with Japanese
              aesthetics. Our warm, inviting space creates the perfect backdrop for an intimate
              date, a lively gathering of friends, or a solo culinary adventure.
            </p>
            <div className="mt-8">
              <Link href="/locations" className="btn-outline">Find Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TWO COLUMN TEXT ===== */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div
            ref={colLeft.ref}
            className={[
              "space-y-5",
              colLeft.inView ? "animate-fade-left" : "opacity-0",
            ].join(" ")}
          >
            <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent)" }}>
              Our Philosophy
            </h3>
            <div className="section-divider ml-0" />
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">A Fusion of Flavors:</span> While
              we hold traditional sushi in high regard, we push boundaries. Experience innovative rolls
              that combine unexpected ingredients and textures for a truly unforgettable experience.
            </p>
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">Global Inspirations:</span> Our
              menu draws from around the world — fiery Latin American spice to the delicate balance of
              European cuisine. Embark on a journey of flavors that transcend borders.
            </p>
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">Beyond Sushi:</span> From expertly
              crafted sashimi platters to comforting hot dishes, there&apos;s something for every palate.
            </p>
          </div>

          <div
            ref={colRight.ref}
            className={[
              "space-y-5",
              colRight.inView ? "animate-fade-left delay-200" : "opacity-0",
            ].join(" ")}
          >
            <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent)" }}>
              Our Commitment
            </h3>
            <div className="section-divider ml-0" />
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">Impeccable Service:</span> Our
              dedicated staff is committed to a seamless experience. Whether a seasoned connoisseur or
              new to this world, every visit is memorable.
            </p>
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">Sustainability at Heart:</span> We
              are passionate about preserving the environment — from sourcing practices to
              waste-reduction efforts.
            </p>
            <p style={{ color: "var(--color-gray-muted)" }}>
              <span className="text-white font-medium">An Unforgettable Journey:</span>{" "}
              Tradition meets innovation, and every bite tells a story. Join us for a culinary
              adventure like no other.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
