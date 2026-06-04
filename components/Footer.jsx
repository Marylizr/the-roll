import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-gray-border)] bg-[var(--color-black)]">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p
            className="text-[var(--color-accent)] text-lg tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Roll
          </p>
          <p className="text-[var(--color-gray-muted)] text-sm leading-relaxed">
            Modern Japanese cuisine. Where tradition meets innovation.
          </p>
        </div>

        <div>
          <p className="text-[var(--color-white)] text-xs tracking-widest uppercase mb-3">
            Navigate
          </p>
          <nav className="flex flex-col gap-2">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/order", label: "Order" },
              { href: "/booking", label: "Reservations" },
              { href: "/locations", label: "Locations" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[var(--color-gray-muted)] text-sm hover:text-[var(--color-accent)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[var(--color-white)] text-xs tracking-widest uppercase mb-3">
            Visit Us
          </p>
          <p className="text-[var(--color-gray-muted)] text-sm leading-relaxed">
            920 Merchants Concourse<br />
            Westbury, NY 11590<br />
            <span className="text-[var(--color-accent)]">(516) 780-0892</span>
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--color-gray-border)] py-4 text-center text-xs text-[var(--color-gray-muted)]">
        © 2024 The Roll SL — All Rights Reserved
      </div>
    </footer>
  );
}
