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

// Logo de cabecera (guardado): https://res.cloudinary.com/da6il8qmv/image/upload/v1760384862/logo_theRoll_h293pw.png
const LOGO_HEADER =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760384862/logo_theRoll_h293pw.png";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // <- CLAVE: solo montamos el portal cuando ya “montó” en cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Bloquear scroll al abrir
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={LOGO_HEADER}
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

      {/* Drawer móvil en portal — solo después de montar (evita hydration mismatch) */}
      {mounted && open &&
        createPortal(
          <div className="fixed inset-0 z-[9999]">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-300"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <div className="fixed inset-y-0 right-0 w-72 max-w-[85%] bg-white shadow-2xl p-5 flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto">
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <span className="text-sm font-semibold text-neutral-800">Menu</span>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-neutral-800" stroke="currentColor" fill="none">
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
