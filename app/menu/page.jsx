"use client";
import { useState } from "react";
import Image from "next/image";
import { addItem } from "@/lib/cartStore";

/* ===== Imágenes ===== */
const IMG = {
  sushi6: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377304/sushi6_sry7ht.png",
  sushi5: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377304/sushi5_ddkoz0.png",
  sushi3: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377303/sushi3_u2ny6q.png",
  sushi2: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377303/sushi2_ru7cgk.png",
  sushi1: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377303/sushi1_ftv9ej.png",
  sashimi5: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377302/sashimi5_wdbs22.png",
  sashimi4: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377302/sashimi4_v1epzj.png",
  sashimi3: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377302/sashimi3_ylur4s.png",
  soda1: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760378481/soda1_rgb4ca.png",
  tea: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377309/tea_e6eukl.svg",
  mocktail: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377301/mocktail_yoilyz.png",
  frappe: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377297/frappe_pehy3w.png",
  img3: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377299/img-3_bdmuft.png",
  img4: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377299/img_4_dsrwdk.svg",
  img2: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377299/img_2_azgvb1.svg",
};

const LOGO_COLOR =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1744040450/logo-theroll_xpdkcj.webp";

/* ===== Datos del menú ===== */
const DATA = {
  introLeft: [
    "Welcome to the heart and soul of The Roll Fusion Sushi – our meticulously curated menu that invites you to embark on a culinary journey like no other.",
    "From the delicate artistry of our signature rolls to the sizzling intensity of our hibachi grills, every item is crafted with the freshest, sustainably sourced ingredients.",
    "Prepare to be enchanted by the unexpected, as our chefs blend global inspirations with time-honored techniques.",
  ],
  introRight:
    "Let us guide you through a symphony of tastes and an experience that transcends the ordinary. Welcome to The Roll – where every dish tells a story.",
  suggestions: [
    {
      id: "lobster-filet-mignon-roll",
      name: "LOBSTER FILET MIGNON ROLL",
      desc:
        "Lobster tempura and avocado rolled and topped with seared filet mignon, creamy wasabi sauce, green onions and red bell peppers; served with lobster tempura over fried zucchini and ginger teriyaki sauce",
      price: 43,
      image: IMG.sushi6,
    },
    {
      id: "surf-and-turf-roll",
      name: "SURF & TURF ROLL",
      desc:
        "Shrimp and asparagus tempura rolled and topped with seared filet mignon; finished with green onions, red bell peppers, fried onions and garlic chips; served with creamy wasabi sauce",
      price: 45,
      image: IMG.sushi5,
    },
    {
      id: "surf",
      name: "SURF",
      desc:
        "Spicy yellowtail mix rolled with cucumber, avocado, jalapeños and cilantro; topped with yellowtail, green onions, crispy garlic and togarashi; served with chili ponzu sauce",
      price: 37,
      image: IMG.sushi3,
    },
    {
      id: "tootsy-maki",
      name: "TOOTSY MAKI",
      desc:
        "Krab† mix, shrimp and cucumber rolled and topped with crunchy tempura bits; drizzled with sweet eel sauce",
      price: 39,
      image: IMG.sushi2,
    },
  ],
  makis: [
    {
      id: "scallop-dynamite-roll",
      name: "SCALLOP DYNAMITE ROLL",
      desc:
        "Krab and cream cheese rolled, lightly tempura battered and topped with scallop dynamite and mushrooms; finished with sweet eel sauce and sesame.",
      price: 38,
      image: IMG.sushi1,
    },
    {
      id: "adults-only-roll",
      name: "ADULTS ONLY ROLL",
      desc:
        "Smoked salmon, krab†, avocado, cream cheese and spicy mayo; topped with tobiko, spicy seaweed salad and red tempura bits; served on a flaming hot plate",
      price: 46,
      image: IMG.img3,
    },
    {
      id: "mango-lobster-roll",
      name: "MANGO LOBSTER ROLL",
      desc:
        "Lobster krab† mix, avocado and cucumber topped with thinly sliced mango; served with mango tobiko and kiwi wasabi sauces",
      price: 41,
      image: IMG.img4,
    },
    {
      id: "rackin-roll",
      name: "“RA”CKIN’ ROLL",
      desc:
        "Krab† and cream cheese rolled, lightly tempura battered and topped with guacamole and “RA”ckin’ Shrimp; ginger teriyaki finish",
      price: 33,
      image: IMG.img2,
    },
  ],
  sashimis: [
    {
      id: "sashimi-special",
      name: "SASHIMI SPECIAL",
      list: ['Salmon "Sake"', 'YELLOWTAIL “HAMACHI”', 'TUNA “MAGURO”', 'ALBACORE “BINCHO MAGURO”'],
      price: 45,
      image: IMG.sashimi5,
    },
    {
      id: "surf-sashimi",
      name: "SURF SASHIMI",
      list: [
        'YELLOWTAIL “HAMACHI”',
        'TUNA “MAGURO”',
        'ALBACORE “BINCHO MAGURO”',
        'STRIPED BASS “SUZUKI”',
        'SCALLOP “HOTATE”',
      ],
      price: 45,
      image: IMG.sashimi4,
    },
    {
      id: "roll-and-sashimi",
      name: "ROLL AND SASHIMI",
      list: [
        'YELLOWTAIL “HAMACHI”',
        'TUNA “MAGURO”',
        'ALBACORE “BINCHO MAGURO”',
        'STRIPED BASS “SUZUKI”',
        'SCALLOP “HOTATE”',
      ],
      price: 45,
      image: IMG.sashimi3,
    },
  ],
  beverages: [
    {
      id: "tea",
      name: "TEA",
      list: ['“RA” ICED TEA', "ICED MATCHA", "HOT JAPANESE TEA"],
      price: 5,
      image: IMG.tea,
    },
    {
      id: "mocktails",
      name: "MOCKTAILS",
      list: [
        "CABANA BOY — Lychee & guava lemonade",
        "CARIBBEAN PASSION — Coconut cream, passion fruit & pineapple",
        "BERRY BERRY NICE — Blueberry & basil lemonade",
      ],
      price: 15,
      image: IMG.mocktail,
    },
    {
      id: "drinks",
      name: "DRINKS",
      list: ["PEPSI", "DIET PEPSI", "STARRY", "MOUNTAIN DEW", "DR. PEPPER"],
      price: 15,
      image: IMG.soda1,
    },
  ],
};

/* ===== Página principal ===== */
export default function MenuPage() {
  return (
    <section className="space-y-10">
      {/* Intro con logo a la derecha */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Menu</h2>
          {DATA.introLeft.map((p, i) => (
            <p key={i} className="text-neutral-700 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <div className="w-72 ml-auto">
            <Image
              src={LOGO_COLOR}
              alt="The Roll"
              width={420}
              height={220}
              className="w-full h-auto"
            />
          </div>
          <p className="text-neutral-700 leading-relaxed">{DATA.introRight}</p>
        </div>
      </div>

      {/* Secciones */}
      <SectionHeader title="Suggestions" />
      <SplitBlock listSide="left" imageUrl={IMG.sushi6}>
        <MenuList items={DATA.suggestions} />
      </SplitBlock>

      <SectionHeader title="Makis" />
      <SplitBlock listSide="right" imageUrl={IMG.sushi5}>
        <MenuList items={DATA.makis} />
      </SplitBlock>

      <SectionHeader title="Sashimis" />
      <SplitBlock listSide="left" imageUrl={IMG.sashimi5}>
        <MenuList items={DATA.sashimis} isBulleted />
      </SplitBlock>

      <SectionHeader title="Beverages" />
      <SplitBlock listSide="right" imageUrl={IMG.mocktail}>
        <MenuList items={DATA.beverages} isBulleted />
      </SplitBlock>
    </section>
  );
}

/* ===== Componentes ===== */
function SectionHeader({ title }) {
  return (
    <div className="bg-neutral-200">
      <div className="max-w-6xl mx-auto pl-12 py-3">
        <h3 className="text-neutral-500 font-semibold tracking-wide">{title}</h3>
      </div>
    </div>
  );
}

function SplitBlock({ listSide = "left", imageUrl, children }) {
  const Img = (
    <div className="rounded-2xl overflow-hidden border shadow-sm min-h-[260px]">
      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    </div>
  );
  const Box = <div className="rounded-2xl bg-white p-6 md:p-8">{children}</div>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {listSide === "left" ? (
        <>
          {Box}
          {Img}
        </>
      ) : (
        <>
          {Img}
          {Box}
        </>
      )}
    </div>
  );
}

function MenuList({ items, isBulleted = false }) {
  const [addedId, setAddedId] = useState(null);

  const onAdd = (it) => {
    addItem({
      id: it.id,
      name: it.name,
      price: Number(it.price || 0),
      image: it.image,
      qty: 1,
    });
    setAddedId(it.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="space-y-10">
      {items.map((it) => (
        <div
          key={it.id}
          className="flex items-start justify-between gap-6 pb-2 border-b border-neutral-100 last:border-none"
        >
          <div className="max-w-2xl">
            <h5 className="text-[12px] font-semibold uppercase tracking-wide text-red-600">
              {it.name}
            </h5>

            {isBulleted ? (
              <ul className="mt-2 list-disc pl-5 text-neutral-700 leading-relaxed">
                {it.list?.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-neutral-700 leading-relaxed">{it.desc}</p>
            )}
          </div>

          <div className="shrink-0 text-right flex flex-col justify-between h-full">
            <div className="text-neutral-700 text-2xl font-semibold mb-3">
              {Number(it.price).toFixed(0)}$
            </div>

            <button
              onClick={() => onAdd(it)}
              className="mt-auto h-9 px-5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all"
            >
              {addedId === it.id ? "Added!" : "Add to cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
