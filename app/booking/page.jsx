"use client";
import { useEffect, useMemo, useState } from "react";

/* Utilidades para el calendario */
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getMonthMatrix(year, month) {
  // month: 0-11
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
  "12:00", "01:00", "02:00",
  "03:00", "07:00", "09:00",
  "08:00", "10:00"
];

export default function BookingPage() {
  /* Fecha activa en calendario */
  const now = new Date();
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [showModal, setShowModal] = useState(false);

  // matriz de calendario
  const matrix = useMemo(
    () => getMonthMatrix(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  // helper: si una fecha es hoy
  const isToday = (d) => {
    if (!d) return false;
    const t = new Date();
    return d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate();
  };

  // formato lindo para modal
  const prettyDate = selectedDate
    ? selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "";

  // Guardar reserva de mock
  const confirm = () => {
    if (!selectedDate || !time) return;
    const payload = {
      date: selectedDate.toISOString().slice(0, 10),
      time,
      party,
      createdAt: new Date().toISOString()
    };
    const key = "theRoll_reservations";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
    setShowModal(true);
  };

  // reset modal
  useEffect(() => {
    if (!showModal) return;
    const id = setTimeout(() => setShowModal(false), 2200); // autocierra suave
    return () => clearTimeout(id);
  }, [showModal]);

  return (
    <section className="space-y-10">
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Secure Your Table</h1>
        <p className="text-neutral-600">Choose a date, time and party size to make a reservation.</p>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">
        {/* Calendario */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-medium">
              {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </h2>
            <div className="flex gap-2">
              <button
                className="w-9 h-9 rounded-md border hover:bg-neutral-50"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                aria-label="Prev month"
              >
                ‹
              </button>
              <button
                className="w-9 h-9 rounded-md border hover:bg-neutral-50"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* week days */}
            <div className="grid grid-cols-7 text-center text-sm text-neutral-500 mb-2">
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-1">{w}</div>
              ))}
            </div>

            {/* days grid */}
            <div className="grid grid-cols-7 gap-2">
              {matrix.flat().map((d, idx) => {
                const selected = selectedDate &&
                  d &&
                  d.toDateString() === selectedDate.toDateString();

                return (
                  <button
                    key={idx}
                    disabled={!d}
                    onClick={() => d && setSelectedDate(d)}
                    className={[
                      "h-10 rounded-md border text-sm",
                      d ? "hover:bg-neutral-50" : "opacity-0 pointer-events-none",
                      isToday(d) ? "ring-1 ring-red-300" : "",
                      selected ? "bg-red-600 text-white border-red-600" : ""
                    ].join(" ")}
                  >
                    {d ? d.getDate() : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slots de horas + Party size */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Times */}
          <div className="lg:col-span-2 rounded-2xl border bg-white shadow-sm p-4">
            <h3 className="font-medium mb-3">Time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={[
                    "h-10 rounded-md border hover:bg-neutral-50",
                    time === t ? "bg-red-600 text-white border-red-600" : ""
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Party size */}
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <h3 className="font-medium mb-3">Table for:</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="w-9 h-9 rounded-full border grid place-content-center hover:bg-neutral-50"
                  onClick={() => setParty((n) => Math.max(1, n - 1))}
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-6 text-center">{party}</span>
                <button
                  className="w-9 h-9 rounded-full border grid place-content-center hover:bg-neutral-50"
                  onClick={() => setParty((n) => Math.min(10, n + 1))}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmar */}
        <div className="flex justify-center">
          <button
            disabled={!selectedDate || !time}
            onClick={confirm}
            className="h-11 px-6 rounded-full bg-red-600 text-white disabled:opacity-50"
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
