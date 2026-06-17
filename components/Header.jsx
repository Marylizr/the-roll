"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/booking", label: "Booking" },
  { href: "/locations", label: "Locations" },
  { href: "/cart", label: "Cart" },
];

const LOGO_HEADER = "/logo-darkBG.webp";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, mounted]);

  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => setOpen(false), []);

  // ESC key closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "nav-scrolled"
            : "bg-[rgba(10,10,10,0.6)] backdrop-blur-md border-b border-(--color-gray-border)",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={LOGO_HEADER}
              alt="The Roll"
              width={260}
              height={96}
              className="h-11 w-auto sm:h-12 md:h-14"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "nav-link px-3 py-1.5 text-sm tracking-wide transition-colors duration-200",
                    active
                      ? "text-(--color-accent) active"
                      : "text-white hover:text-(--color-accent)",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden inline-flex h-11 w-11 items-center justify-center text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mounted && open &&
        createPortal(
          <div className="fixed inset-0 z-9999" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
            />
            <div className="fixed inset-y-0 right-0 w-72 max-w-[85%] bg-(--color-dark) border-l border-(--color-gray-border) shadow-2xl p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between mb-6 border-b border-(--color-gray-border) pb-4">
                <span
                  style={{ fontFamily: "var(--font-heading)" }}
                  className="text-(--color-accent) text-xl tracking-widest uppercase"
                >
                  Menu
                </span>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center text-white hover:text-(--color-accent) transition-colors"
                  onClick={close}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="grid gap-1">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "px-4 py-3 rounded-lg text-sm tracking-wide transition-colors duration-200",
                        active
                            ? "bg-[rgba(201,169,110,0.12)] text-(--color-accent) border border-[rgba(201,169,110,0.2)]"
                            : "text-white hover:bg-(--color-dark-alt) hover:text-(--color-accent)",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6 text-xs text-(--color-gray-muted) text-center">
                © The Roll — Modern Japanese Cuisine
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
