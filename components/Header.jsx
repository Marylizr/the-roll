"use client";
import { useEffect, useState } from "react";
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

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // bloquear scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // cerrar al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/da6il8qmv/image/upload/v1760384862/logo_theRoll_h293pw.png"
              alt="The Roll"
              width={180}
              height={40}
              className="h-9 w-auto"
              priority
            />
            <span className="sr-only">The Roll</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md transition ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-neutral-700 hover:text-red-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Botón hamburguesa (sin borde) */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-neutral-800"
              stroke="currentColor"
              fill="none"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Menú móvil renderizado en portal al <body> */}
      {typeof window !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
              open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            aria-hidden={!open}
          >
            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />

            {/* Panel blanco */}
            <div
              className={`fixed inset-y-0 right-0 w-72 max-w-[85%] bg-white shadow-2xl p-5 flex flex-col transform transition-transform duration-300 ${
                open ? "translate-x-0" : "translate-x-full"
              } overflow-y-auto`}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <span className="text-sm font-semibold text-neutral-800">Menu</span>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-neutral-800"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-2 grid gap-1">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm transition ${
                        active
                          ? "bg-red-600 text-white"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6 text-xs text-neutral-500 text-center">
                © The Roll
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}




