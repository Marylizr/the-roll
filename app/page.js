"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BANNER =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_1600/v1760380887/banner_ohqx3y.svg";
const LOGO_WHITE =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_640/v1760380835/logo_white_r8ent5.png";
const LOGO_COLOR =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_560/v1744040450/logo-theroll_xpdkcj.webp";
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
    <section>
      {/* ===== HERO — full viewport ===== */}
      <div className="relative w-full" style={{ height: "100svh", minHeight: "560px" }}>
        <Image
          src={BANNER}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* Centered bubble */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={[
              "rounded-full bg-black/90",
              "w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] md:w-[360px] md:h-[360px]",
              "shadow-[0_14px_60px_rgba(0,0,0,.55)]",
              "border border-[rgba(201,169,110,0.15)]",
              "flex flex-col items-center justify-center text-center",
              play ? "hero-bubble" : "opacity-0",
            ].join(" ")}
          >
            <div className={["w-40 sm:w-48 md:w-56", play ? "hero-logo-enter" : "opacity-0"].join(" ")}>
              <Image
                src={LOGO_WHITE}
                alt="The Roll"
                width={640}
                height={240}
                className="w-full h-auto"
                priority
              />
            </div>
            <p
              className={[
                "mt-3 text-base sm:text-lg tracking-[0.15em] text-[var(--color-accent)]",
                play ? "hero-welcome" : "opacity-0",
              ].join(" ")}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              WELCOME
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className={[
              "mt-8 flex flex-col sm:flex-row gap-3",
              play ? "animate-fade-up delay-500" : "opacity-0",
            ].join(" ")}
          >
            <Link href="/menu" className="btn-primary">Explore Menu</Link>
            <Link href="/booking" className="btn-outline">Reserve a Table</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-gray-muted)] text-xs tracking-widest">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-[var(--color-accent)] opacity-50" />
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
          className="mx-auto h-auto w-[200px] sm:w-[300px] md:w-[420px]"
        />
        <div className="section-divider" />
        <h2
          className="text-[var(--color-accent)] font-light italic"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Tradition Meets Innovation
        </h2>
        <p className="text-[var(--color-gray-muted)] max-w-3xl mx-auto leading-relaxed">
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
        <div className="overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
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
          className="flex items-center bg-[var(--color-dark-alt)] border-l border-[var(--color-gray-border)]"
        >
          <div className="p-10 md:p-14 lg:p-16 text-center lg:text-left">
            <h2
              className="font-light italic text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Elegant Ambiance
            </h2>
            <div className="section-divider lg:ml-0" />
            <p className="text-[var(--color-gray-muted)] leading-relaxed max-w-xl">
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
            <h3 style={{ fontFamily: "var(--font-heading)" }} className="text-[var(--color-accent)]">
              Our Philosophy
            </h3>
            <div className="section-divider ml-0" />
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">A Fusion of Flavors:</span> While
              we hold traditional sushi in high regard, we push boundaries. Experience innovative rolls
              that combine unexpected ingredients and textures for a truly unforgettable experience.
            </p>
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">Global Inspirations:</span> Our
              menu draws from around the world — fiery Latin American spice to the delicate balance of
              European cuisine. Embark on a journey of flavors that transcend borders.
            </p>
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">Beyond Sushi:</span> From expertly
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
            <h3 style={{ fontFamily: "var(--font-heading)" }} className="text-[var(--color-accent)]">
              Our Commitment
            </h3>
            <div className="section-divider ml-0" />
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">Impeccable Service:</span> Our
              dedicated staff is committed to a seamless experience. Whether a seasoned connoisseur or
              new to this world, every visit is memorable.
            </p>
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">Sustainability at Heart:</span> We
              are passionate about preserving the environment — from sourcing practices to
              waste-reduction efforts.
            </p>
            <p className="text-[var(--color-gray-muted)]">
              <span className="text-[var(--color-white)] font-medium">An Unforgettable Journey:</span>{" "}
              Tradition meets innovation, and every bite tells a story. Join us for a culinary
              adventure like no other.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
