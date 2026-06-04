"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addItem } from "@/lib/cartStore";

function useInView(threshold = 0.1) {
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

const IMG = {
  sushi6:   "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377304/sushi6_sry7ht.png",
  sushi5:   "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377304/sushi5_ddkoz0.png",
  sushi3:   "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377303/sushi3_u2ny6q.png",
  sushi2:   "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377303/sushi2_ru7cgk.png",
  sushi1:   "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377303/sushi1_ftv9ej.png",
  sashimi5: "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377302/sashimi5_wdbs22.png",
  sashimi4: "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377302/sashimi4_v1epzj.png",
  sashimi3: "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377302/sashimi3_ylur4s.png",
  soda1:    "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760378481/soda1_rgb4ca.png",
  tea:      "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377309/tea_e6eukl.svg",
  mocktail: "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377301/mocktail_yoilyz.png",
  img3:     "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377299/img-3_bdmuft.png",
  img4:     "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377299/img_4_dsrwdk.svg",
  img2:     "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_700/v1760377299/img_2_azgvb1.svg",
};

const LOGO_COLOR =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_420/v1744040450/logo-theroll_xpdkcj.webp";

const DATA = {
  introLeft: [
    "Welcome to the heart and soul of The Roll Fusion Sushi — our meticulously curated menu invites you to embark on a culinary journey like no other.",
    "From the delicate artistry of our signature rolls to the sizzling intensity of our hibachi grills, every item is crafted with the freshest, sustainably sourced ingredients.",
    "Prepare to be enchanted by the unexpected, as our chefs blend global inspirations with time-honored techniques.",
  ],
  introRight:
    "Let us guide you through a symphony of tastes and an experience that transcends the ordinary. Welcome to The Roll — where every dish tells a story.",
  suggestions: [
    { id: "lobster-filet-mignon-roll", name: "LOBSTER FILET MIGNON ROLL", desc: "Lobster tempura and avocado rolled and topped with seared filet mignon, creamy wasabi sauce, green onions and red bell peppers; served with lobster tempura over fried zucchini and ginger teriyaki sauce", price: 43, image: IMG.sushi6 },
    { id: "surf-and-turf-roll", name: "SURF & TURF ROLL", desc: "Shrimp and asparagus tempura rolled and topped with seared filet mignon; finished with green onions, red bell peppers, fried onions and garlic chips; served with creamy wasabi sauce", price: 45, image: IMG.sushi5 },
    { id: "surf", name: "SURF", desc: "Spicy yellowtail mix rolled with cucumber, avocado, jalapeños and cilantro; topped with yellowtail, green onions, crispy garlic and togarashi; served with chili ponzu sauce", price: 37, image: IMG.sushi3 },
    { id: "tootsy-maki", name: "TOOTSY MAKI", desc: "Krab† mix, shrimp and cucumber rolled and topped with crunchy tempura bits; drizzled with sweet eel sauce", price: 39, image: IMG.sushi2 },
  ],
  makis: [
    { id: "scallop-dynamite-roll", name: "SCALLOP DYNAMITE ROLL", desc: "Krab and cream cheese rolled, lightly tempura battered and topped with scallop dynamite and mushrooms; finished with sweet eel sauce and sesame.", price: 38, image: IMG.sushi1 },
    { id: "adults-only-roll", name: "ADULTS ONLY ROLL", desc: "Smoked salmon, krab†, avocado, cream cheese and spicy mayo; topped with tobiko, spicy seaweed salad and red tempura bits; served on a flaming hot plate", price: 46, image: IMG.img3 },
    { id: "mango-lobster-roll", name: "MANGO LOBSTER ROLL", desc: "Lobster krab† mix, avocado and cucumber topped with thinly sliced mango; served with mango tobiko and kiwi wasabi sauces", price: 41, image: IMG.img4 },
    { id: "rackin-roll", name: '"RA"CKIN\' ROLL', desc: 'Krab† and cream cheese rolled, lightly tempura battered and topped with guacamole and "RA"ckin\' Shrimp; ginger teriyaki finish', price: 33, image: IMG.img2 },
  ],
  sashimis: [
    { id: "sashimi-special", name: "SASHIMI SPECIAL", list: ['Salmon "Sake"', 'Yellowtail "Hamachi"', 'Tuna "Maguro"', 'Albacore "Bincho Maguro"'], price: 45, image: IMG.sashimi5 },
    { id: "surf-sashimi", name: "SURF SASHIMI", list: ['Yellowtail "Hamachi"', 'Tuna "Maguro"', 'Albacore "Bincho Maguro"', 'Striped Bass "Suzuki"', 'Scallop "Hotate"'], price: 45, image: IMG.sashimi4 },
    { id: "roll-and-sashimi", name: "ROLL AND SASHIMI", list: ['Yellowtail "Hamachi"', 'Tuna "Maguro"', 'Albacore "Bincho Maguro"', 'Striped Bass "Suzuki"', 'Scallop "Hotate"'], price: 45, image: IMG.sashimi3 },
  ],
  beverages: [
    { id: "tea", name: "TEA", list: ['"RA" Iced Tea', "Iced Matcha", "Hot Japanese Tea"], price: 5, image: IMG.tea },
    { id: "mocktails", name: "MOCKTAILS", list: ["Cabana Boy — Lychee & guava lemonade", "Caribbean Passion — Coconut cream, passion fruit & pineapple", "Berry Berry Nice — Blueberry & basil lemonade"], price: 15, image: IMG.mocktail },
    { id: "drinks", name: "DRINKS", list: ["Pepsi", "Diet Pepsi", "Starry", "Mountain Dew", "Dr. Pepper"], price: 5, image: IMG.soda1 },
  ],
};

export default function MenuClient() {
  const intro = useInView();
  return (
    <section className="pb-20">
      {/* Hero banner */}
      <div className="bg-[var(--color-dark-alt)] border-b border-[var(--color-gray-border)] py-16 px-6 text-center">
        <h1
          className="text-[var(--color-accent)] font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Our Menu
        </h1>
        <div className="section-divider" />
        <p className="text-[var(--color-gray-muted)] max-w-xl mx-auto">
          Meticulously curated. Sustainably sourced. Extraordinarily crafted.
        </p>
      </div>

      {/* Intro */}
      <div
        ref={intro.ref}
        className={[
          "max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start",
          intro.inView ? "animate-fade-up" : "opacity-0",
        ].join(" ")}
      >
        <div className="space-y-4">
          {DATA.introLeft.map((p, i) => (
            <p key={i} className="text-[var(--color-gray-muted)] leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="space-y-4">
          <div className="w-64 ml-auto">
            <Image src={LOGO_COLOR} alt="The Roll" width={420} height={220} className="w-full h-auto" loading="lazy" />
          </div>
          <p className="text-[var(--color-gray-muted)] leading-relaxed">{DATA.introRight}</p>
        </div>
      </div>

      {/* Sections */}
      <MenuSection title="Suggestions" items={DATA.suggestions} imageUrl={IMG.sushi6} listSide="right" />
      <MenuSection title="Makis"       items={DATA.makis}       imageUrl={IMG.sushi5} listSide="left"  />
      <MenuSection title="Sashimis"    items={DATA.sashimis}    imageUrl={IMG.sashimi5} listSide="right" isBulleted />
      <MenuSection title="Beverages"   items={DATA.beverages}   imageUrl={IMG.mocktail} listSide="left"  isBulleted />
    </section>
  );
}

function MenuSection({ title, items, imageUrl, listSide = "left", isBulleted = false }) {
  const section = useInView(0.05);
  return (
    <div ref={section.ref} className={section.inView ? "animate-fade-up" : "opacity-0"}>
      {/* Section header */}
      <div className="border-y border-[var(--color-gray-border)] bg-[var(--color-dark-alt)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1 h-5 bg-[var(--color-accent)] rounded-full" />
          <h2
            className="text-[var(--color-accent)] tracking-[0.15em] uppercase text-sm font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Split layout */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {listSide === "left" ? (
          <>
            <MenuList items={items} isBulleted={isBulleted} />
            <SideImage src={imageUrl} alt={title} />
          </>
        ) : (
          <>
            <SideImage src={imageUrl} alt={title} />
            <MenuList items={items} isBulleted={isBulleted} />
          </>
        )}
      </div>
    </div>
  );
}

function SideImage({ src, alt }) {
  return (
    <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[var(--color-gray-border)] shadow-lg">
      <Image
        src={src}
        alt={alt}
        width={700}
        height={525}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function MenuList({ items, isBulleted = false }) {
  const [addedId, setAddedId] = useState(null);

  const onAdd = (it) => {
    addItem({ id: it.id, name: it.name, price: Number(it.price || 0), image: it.image, qty: 1 });
    setAddedId(it.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div
      className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] p-6 md:p-8 space-y-8"
    >
      {items.map((it) => (
        <div
          key={it.id}
          className="flex items-start justify-between gap-6 pb-6 border-b border-[var(--color-gray-border)] last:border-none last:pb-0"
        >
          <div className="max-w-2xl">
            <h5
              className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {it.name}
            </h5>
            {isBulleted ? (
              <ul className="mt-2 list-disc pl-5 text-[var(--color-gray-muted)] leading-relaxed space-y-1">
                {it.list?.map((li, i) => <li key={i}>{li}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-[var(--color-gray-muted)] leading-relaxed">{it.desc}</p>
            )}
          </div>

          <div className="shrink-0 text-right flex flex-col items-end gap-3">
            <span
              className="text-2xl font-light text-[var(--color-white)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ${it.price}
            </span>
            <button
              onClick={() => onAdd(it)}
              className={[
                "h-9 px-4 rounded-md text-xs font-medium tracking-wide transition-all duration-200",
                addedId === it.id
                  ? "bg-[var(--color-accent)] text-[var(--color-black)]"
                  : "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[rgba(201,169,110,0.1)]",
              ].join(" ")}
            >
              {addedId === it.id ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
