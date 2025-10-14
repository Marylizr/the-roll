import Image from "next/image";

/* ==== Reemplaza estas URLs por tus imágenes reales ==== */
const IMG_SUGGESTIONS =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377299/img-3_bdmuft.png";
const IMG_MAKIS =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377299/img_4_dsrwdk.svg";
const IMG_SASHIMIS =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377302/sashimi5_wdbs22.png";
const IMG_BEVERAGES =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377309/tea_e6eukl.svg";

const LOGO_COLOR =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1744040450/logo-theroll_xpdkcj.webp";

/* ==== Datos (calcados del diseño) ==== */
const DATA = {
  introLeft: [
    "Welcome to the heart and soul of The Roll Fusion Sushi – our meticulously curated menu that invites you to embark on a culinary journey like no other. Each dish is a testament to our dedication to both tradition and innovation, a harmonious dance of flavors and textures that will leave your taste buds tingling with delight.",
    "From the delicate artistry of our signature rolls to the sizzling intensity of our hibachi grills, every item on our menu is a carefully crafted masterpiece. We've scoured the seas for the freshest, sustainably sourced ingredients, ensuring that every bite is a celebration of nature's bounty.",
    "Prepare to be enchanted by the unexpected, as our chefs fearlessly blend global inspirations with time-honored techniques. Whether you're a seasoned sushi aficionado or a first-time explorer, there's something here to captivate every palate.",
  ],
  introRight:
    "So, without further ado, let us guide you through a symphony of tastes, a tapestry of flavors, and an experience that transcends the ordinary. Welcome to a culinary adventure at Sakura Fusion Sushi – where every dish tells a story, and every meal is an unforgettable memory.",
  suggestions: [
    {
      name: "LOBSTER FILET MIGNON ROLL",
      desc:
        "Lobster tempura and avocado rolled and topped with seared filet mignon, creamy wasabi sauce, green onions and red bell peppers; served with lobster tempura over fried zucchini and ginger teriyaki sauce",
      price: 43,
    },
    {
      name: "SURF & TURF ROLL",
      desc:
        "Shrimp and asparagus tempura rolled and topped with seared filet mignon; finished with green onions, red bell peppers, fried onions and garlic chips; served with creamy wasabi sauce",
      price: 45,
    },
    {
      name: "SURF",
      desc:
        "Spicy yellowtail mix rolled with cucumber, avocado, jalapeños and cilantro; topped with yellowtail, green onions, crispy garlic and togarashi; served with chili ponzu sauce",
      price: 37,
    },
    {
      name: "TOOTSY MAKI",
      desc:
        "Krab† mix, shrimp and cucumber rolled and topped with crunchy tempura bits; drizzled with sweet eel sauce",
      price: 39,
    },
  ],
  makis: [
    {
      name: "SCALLOP DYNAMITE ROLL",
      desc:
        "Krab and cream cheese rolled, lightly tempura battered and topped with scallop dynamite and mushrooms, baked and topped with sweet eel sauce, red and green tempura bits, red peppers and sesame seeds.",
      price: 38,
    },
    {
      name: "ADULTS ONLY ROLL",
      desc:
        "Smoked salmon, krab†, avocado, cream cheese and spicy mayo; topped with tobiko, spicy seaweed salad and red tempura bits; served on a flaming hot plate",
      price: 46,
    },
    {
      name: "MANGO LOBSTER ROLL",
      desc:
        "Lobster krab† mix, avocado and cucumber rolled and topped with thinly sliced mango; served with mango tobiko and kiwi wasabi sauces",
      price: 41,
    },
    {
      name: "“RA”CKIN’ ROLL",
      desc:
        "Krab† and cream cheese rolled, lightly tempura battered and topped with guacamole and “RA”ckin’ Shrimp; finished with a ginger teriyaki sauce, red tempura bits and togarashi",
      price: 33,
    },
  ],
  sashimis: [
    {
      name: "SASHIMI SPECIAL",
      list: ['Salmon "Sake"', 'YELLOWTAIL “HAMACHI”', 'TUNA “MAGURO”', 'ALBACORE “BINCHO MAGURO”'],
      price: 45,
    },
    {
      name: "SURF SASHIMI",
      list: [
        'YELLOWTAIL “HAMACHI”',
        'TUNA “MAGURO”',
        'ALBACORE “BINCHO MAGURO”',
        'STRIPED BASS “SUZUKI”',
        'SCALLOP “HOTATE”',
      ],
      price: 45,
    },
    {
      name: "ROLL AND SASHIMI",
      list: [
        'YELLOWTAIL “HAMACHI”',
        'TUNA “MAGURO”',
        'ALBACORE “BINCHO MAGURO”',
        'STRIPED BASS “SUZUKI”',
        'SCALLOP “HOTATE”',
      ],
      price: 45,
    },
  ],
  beverages: [
    {
      name: "TEA",
      list: ['“RA” ICED TEA', "ICED MATCHA", "HOT JAPANESE TEA"],
      price: 5,
    },
    {
      name: "MOCKTAILS",
      list: [
        "CABANA BOY — Refreshing lychee and guava lemonade",
        "CARIBBEAN PASSION — Coconut cream, passion fruit and pineapple juice",
        "BERRY BERRY NICE — Blueberry and basic lemonade",
      ],
      price: 15,
    },
    {
      name: "DRINKS",
      list: ["PEPSI", "DIET PEPSI", "STARRY", "MOUNTAIN DEW", "DR. PEPPER"],
      price: 15,
    },
  ],
};

export default function MenuPage() {
  return (
    <section className="space-y-10">
      {/* ===== Intro 2 columnas con logo a la derecha ===== */}
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
          <div className="w-72 ml-center">
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

      {/* ===== Suggestions ===== */}
      <SectionHeader title="Suggestions" />
      <SplitBlock listSide="left" imageUrl={IMG_SUGGESTIONS}>
        <MenuList items={DATA.suggestions} />
      </SplitBlock>

      {/* ===== Makis ===== */}
      <SectionHeader title="Makis" />
      <SplitBlock listSide="right" imageUrl={IMG_MAKIS}>
        <MenuList items={DATA.makis} />
      </SplitBlock>

      {/* ===== Sashimis ===== */}
      <SectionHeader title="Sashimis" />
      <SplitBlock listSide="left" imageUrl={IMG_SASHIMIS}>
        <MenuList items={DATA.sashimis} isBulleted />
      </SplitBlock>

      {/* ===== Beverages ===== */}
      <SectionHeader title="Beverages" />
      <SplitBlock listSide="right" imageUrl={IMG_BEVERAGES}>
        <MenuList items={DATA.beverages} isBulleted />
      </SplitBlock>
    </section>
  );
}

/* ---------------- Componentes ---------------- */

function SectionHeader({ title }) {
  return (
   <div className="bg-neutral-200">
      <div className="max-w-6xl mx-auto pl-12 py-3">
      <h2 className="text-neutral-500 font-semibold tracking-wide">
         {title}
      </h2>
      </div>
   </div>
  );
}

/** Layout que alterna lista + imagen, como el mock */
function SplitBlock({ listSide = "left", imageUrl, children }) {
  const Img = (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    </div>
  );

  const Box = (
    <div className="rounded-2xl  bg-white p-6 md:p-8">{children}</div>
  );

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

/** Lista con títulos rojos pequeños, descripción y precio a la derecha */
function MenuList({ items, isBulleted = false }) {
  return (
    <div className="space-y-6">
      {items.map((it, idx) => (
        <div key={idx} className="flex items-start justify-between gap-6">
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

          <div className="shrink-0">
            <span className="text-neutral-600 text-xl font-semibold">{it.price}$</span>
          </div>
        </div>
      ))}
    </div>
  );
}
