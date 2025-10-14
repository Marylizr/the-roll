"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const BANNER =
    "https://res.cloudinary.com/da6il8qmv/image/upload/v1760380887/banner_ohqx3y.svg";
  const LOGO_WHITE =
    "https://res.cloudinary.com/da6il8qmv/image/upload/v1760380835/logo_white_r8ent5.png";
  const LOGO_COLOR =
    "https://res.cloudinary.com/da6il8qmv/image/upload/v1744040450/logo-theroll_xpdkcj.webp";
  const SUSHI= "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377303/sushi2_ru7cgk.png"

  // fuerza la animación al montar
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), []);

  return (
    <section className="space-y-16">
      {/* ===== HERO ===== */}
      <div className="relative w-full h-[62vh] min-h-[560px] overflow-hidden border">
        <img src={BANNER} alt="The Roll — hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={[
              "rounded-full bg-black/90 text-white",
              "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]",
              "shadow-[0_14px_36px_rgba(0,0,0,.38)]",
              "flex flex-col items-center justify-center text-center",
              play ? "hero-bubble" : "",
            ].join(" ")}
          >
            <div className={["w-44 sm:w-52 md:w-60", play ? "hero-logo-enter" : ""].join(" ")}>
              <Image src={LOGO_WHITE} alt="The Roll" width={640} height={240} className="w-full h-auto mx-auto" priority />
            </div>
            <p className={["mt-3 sm:mt-4 text-lg sm:text-xl tracking-wide text-neutral-200", play ? "hero-welcome" : ""].join(" ")}>
              WELCOME
            </p>
          </div>
        </div>
      </div>

      {/* ===== LOGO PRINCIPAL + TAGLINE ===== */}
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <Image
          src={LOGO_COLOR}
          alt="The Roll"
          width={560}
          height={220}
          className="mx-auto h-auto w-[240px] sm:w-[360px] md:w-[480px]"
        />
        <h2 className="text-lg md:text-xl text-neutral-700">Where Tradition Meets Innovation!</h2>
        <p className="text-neutral-500 max-w-3xl mx-auto">
          Crafting Culinary Artistry: At The Roll, we take sushi to new heights, blending centuries-old techniques with
          avant-garde creativity. Our master chefs meticulously select the freshest, sustainable ingredients, transforming
          them into edible masterpieces that tantalize the taste buds.
        </p>
      </div>

            {/* ===== BLOQUE: IMAGEN + PANEL ELEGANT AMBIANCE ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Imagen lado izquierdo */}
        <div className="overflow-hidden border shadow-sm">
          <img
            src={SUSHI}
            alt="Signature roll"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Panel derecho centrado verticalmente */}
        <div className="flex items-center bg-neutral-100">
          <div className="p-10 md:p-14 lg:p-16 text-center lg:text-left mx-auto">
            <h3 className="text-4xl md:text-5xl font-light italic text-neutral-400">
              Elegant Ambiance:
            </h3>
            <p className="mt-4 text-neutral-400 leading-relaxed max-w-xl">
              Step into a serene oasis where contemporary design harmonizes with Japanese
              aesthetics. Our warm, inviting space creates the perfect backdrop for an
              intimate date, a lively gathering of friends, or a solo culinary adventure.
            </p>
          </div>
        </div>
      </div>


      {/* ===== BLOQUE: PÁRRAFOS EN DOS COLUMNAS ===== */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-neutral-700">
          <div className="space-y-4">
            <p>
              <span className="font-medium">A Fusion of Flavors:</span> While we hold traditional sushi in high regard, we’re
              not afraid to push boundaries. Experience innovative rolls that combine unexpected ingredients and textures for a
              truly unforgettable dining experience.
            </p>
            <p>
              <span className="font-medium">Global Inspirations:</span> Our menu draws inspiration from around the world,
              infusing diverse influences into each dish. From the fiery spice of Latin America to the delicate balance of
              European cuisine, embark on a journey of flavors that transcend borders.
            </p>
            <p>
              <span className="font-medium">Beyond Sushi:</span> While sushi is our pride and joy, our menu offers a range of
              options to suit every palate. From expertly crafted sashimi platters to comforting hot dishes, there’s something
              for everyone.
            </p>
          </div>

          <div className="space-y-4">
            <p>
              <span className="font-medium">Impeccable Service:</span> Our dedicated staff is committed to providing a
              seamless dining experience. Whether you’re a seasoned sushi connoisseur or new to this culinary world, every
              visit is memorable.
            </p>
            <p>
              <span className="font-medium">Sustainability at Heart:</span> We’re passionate about preserving the environment
              for future generations — from sourcing practices to waste-reduction efforts.
            </p>
            <p>
              <span className="font-medium">An Unforgettable Journey:</span> Tradition meets innovation, and every bite tells
              a story. Join us for a culinary adventure like no other.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
