"use client";
import { useEffect, useMemo, useState } from "react";

/* Ornamento izquierdo (puedes cambiarla por tu flor/branch) */
const BG_BOOKING =
  "https://res.cloudinary.com/da6il8qmv/image/upload/v1760377293/booking-banner_xlwtdp.svg";

/* === Utilidades de calendario === */
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const startIdx = (first.getDay() + 6) % 7; // Lunes=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startIdx; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

const TIME_SLOTS = [
  "12:00", "03:00", "08:00",
  "01:00", "04:00", "09:00",
  "02:00", "07:00", "10:00",
];

export default function BookingPage() {
  /* ===== Hydration-safe y hooks en orden ===== */
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [now, setNow] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [showModal, setShowModal] = useState(false);

  // Inicializa fechas SOLO en cliente
  useEffect(() => {
    if (!isClient) return;
    const d = new Date();
    setNow(d);
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [isClient]);

  // Derivados
  const matrix = useMemo(() => {
    if (!cursor) return [];
    return getMonthMatrix(cursor.getFullYear(), cursor.getMonth());
  }, [cursor]);

  const isToday = (d) => {
    if (!d || !now) return false;
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const confirm = () => {
    if (!selectedDate || !time) return;
    const payload = {
      date: selectedDate.toISOString().slice(0, 10),
      time,
      party,
      createdAt: new Date().toISOString(),
    };
    const key = "theRoll_reservations";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2200);
  };

  const prettyDate = selectedDate
    ? selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  // Placeholder mientras monta en cliente (evita mismatch)
  if (!isClient || !cursor) return <div className="min-h-[60vh]" />;

  return (
    <section className="space-y-10">
      {/* ===== HERO con fondo gris + flor izquierda + tarjeta login ===== */}
      <div className="relative bg-neutral-100 border-y">
        {/* Ornamento lateral izquierdo */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute left-0 top-0 h-full w-1/2 opacity-30"
            style={{
              backgroundImage: `url(${BG_BOOKING})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "left center",
              maskImage: "linear-gradient(to right, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 60%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Secure Your Table:
          </h1>
          <p className="text-neutral-600 text-center">
            Please Log In to Make a Reservation
          </p>

          {/* Tarjeta de login (mock visual) */}
          <div className="mx-auto mt-6 w-full max-w-md rounded-2xl bg-white border shadow-sm p-6 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-content-center rounded-full border bg-neutral-50 text-neutral-400">
              {/* avatar */}
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                />
              </svg>
            </div>

            <div className="grid gap-3">
              <input
                placeholder="user name:"
                className="h-10 rounded-md border px-3"
              />
              <input
                placeholder="password:"
                type="password"
                className="h-10 rounded-md border px-3"
              />
              <button className="mx-auto mt-1 h-9 rounded-full bg-neutral-100 px-5 text-neutral-700 shadow-sm">
                Let’s go!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tarjetas: Calendario + Horas + Party + Confirm ===== */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 gap-8">
        {/* Calendario */}
        <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-neutral-700 font-medium">
              {cursor.toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-2">
              <button
                className="w-9 h-9 rounded-md border text-neutral-700 hover:bg-neutral-50"
                onClick={() =>
                  setCursor(
                    new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)
                  )
                }
                aria-label="Prev month"
              >
                <span className="text-lg">‹</span>
              </button>
              <button
                className="w-9 h-9 rounded-md border text-neutral-700 hover:bg-neutral-50"
                onClick={() =>
                  setCursor(
                    new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
                  )
                }
                aria-label="Next month"
              >
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-5">
            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center text-sm text-neutral-500 mb-2">
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {matrix.flat().map((d, i) => {
                const isSelected =
                  selectedDate &&
                  d &&
                  d.toDateString() === selectedDate.toDateString();

                if (!d) {
                  return (
                    <div key={i} className="h-10 opacity-0 pointer-events-none" />
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={[
                      "h-10 rounded-md border text-sm",
                      "hover:bg-neutral-50",
                      isToday(d) ? "ring-1 ring-red-300" : "",
                      isSelected ? "bg-red-600 text-white border-red-600" : "",
                    ].join(" ")}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horas (tabla 3x3) */}
        <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
          <div className="grid grid-cols-3">
            {TIME_SLOTS.map((t, idx) => {
              const active = time === t;
              const showTop = idx >= 3;
              const showLeft = idx % 3 !== 0;
              return (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={[
                    "h-16 text-sm font-medium",
                    "hover:bg-neutral-50",
                    "relative",
                    active
                      ? "bg-white text-red-600"
                      : "bg-neutral-50 text-neutral-700",
                    showTop ? "border-t" : "",
                    showLeft ? "border-l" : "",
                    "border-neutral-300",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Party size */}
        <div className="rounded-2xl border bg-white shadow-md p-5">
          <div className="flex items-center gap-4">
            <span className="text-neutral-700">Table for:</span>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-full border grid place-content-center text-neutral-700 hover:bg-neutral-50"
                onClick={() => setParty((n) => Math.max(1, n - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-6 text-center text-neutral-800">{party}</span>
              <button
                className="w-8 h-8 rounded-full border grid place-content-center text-neutral-700 hover:bg-neutral-50"
                onClick={() => setParty((n) => Math.min(10, n + 1))}
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className="flex justify-center pt-2">
          <button
            disabled={!selectedDate || !time}
            onClick={confirm}
            className="h-11 px-10 rounded-md bg-red-600 text-white shadow-md hover:bg-red-700 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-[60] grid place-items-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center">
            <div className="text-2xl font-semibold mb-2">Reservation Confirmed!</div>
            <p className="text-neutral-700">
              Reservation for <strong>{party}</strong> people<br />
              on <strong>{prettyDate}</strong> at <strong>{time}</strong>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
