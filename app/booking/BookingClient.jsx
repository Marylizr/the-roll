"use client";
import { useEffect, useMemo, useState } from "react";

const BG_BOOKING =
  "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_1200/v1760377293/booking-banner_xlwtdp.svg";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const startIdx = (first.getDay() + 6) % 7;
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
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "07:00 PM", "08:00 PM",
  "09:00 PM", "10:00 PM", "11:00 PM",
];

export default function BookingPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [now, setNow] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isClient) return;
    const d = new Date();
    setNow(d);
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [isClient]);

  const matrix = useMemo(() => {
    if (!cursor) return [];
    return getMonthMatrix(cursor.getFullYear(), cursor.getMonth());
  }, [cursor]);

  const isToday = (d) => {
    if (!d || !now) return false;
    return d.toDateString() === now.toDateString();
  };

  const confirm = () => {
    if (!selectedDate || !time) return;
    const payload = { date: selectedDate.toISOString().slice(0, 10), time, party, createdAt: new Date().toISOString() };
    const key = "theRoll_reservations";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const prettyDate = selectedDate
    ? selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "";

  if (!isClient || !cursor) return <div className="min-h-[60vh]" />;

  return (
    <section className="pb-20">
      {/* Hero */}
      <div className="relative border-b border-[var(--color-gray-border)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${BG_BOOKING})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dark)] via-transparent to-[var(--color-dark)]" aria-hidden="true" />

        <div className="relative max-w-xl mx-auto px-6 py-16 text-center">
          <h1
            className="text-[var(--color-accent)] font-light"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reserve Your Table
          </h1>
          <div className="section-divider" />
          <p className="text-[var(--color-gray-muted)] mb-8">
            Sign in to confirm your reservation
          </p>

          {/* Mock login card */}
          <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] p-6 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-content-center rounded-full border border-[var(--color-gray-border)] bg-[var(--color-dark)] text-[var(--color-gray-muted)]">
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
              </svg>
            </div>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Username"
                className="h-11 rounded-lg border border-[var(--color-gray-border)] bg-[var(--color-dark)] px-4 text-[var(--color-white)] placeholder:text-[var(--color-gray-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                className="h-11 rounded-lg border border-[var(--color-gray-border)] bg-[var(--color-dark)] px-4 text-[var(--color-white)] placeholder:text-[var(--color-gray-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button className="btn-primary w-full mt-1">Let&apos;s go!</button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking widgets */}
      <div className="max-w-2xl mx-auto px-6 py-10 grid gap-6">

        {/* Calendar */}
        <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-gray-border)]">
            <h2
              className="text-[var(--color-white)] font-light"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </h2>
            <div className="flex gap-2">
              {["‹", "›"].map((ch, i) => (
                <button
                  key={ch}
                  className="w-10 h-10 rounded-lg border border-[var(--color-gray-border)] text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-lg"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + (i === 0 ? -1 : 1), 1))}
                  aria-label={i === 0 ? "Previous month" : "Next month"}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="grid grid-cols-7 text-center text-xs text-[var(--color-gray-muted)] mb-3 tracking-widest">
              {WEEKDAYS.map((w) => <div key={w} className="py-1">{w}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {matrix.flat().map((d, i) => {
                const isSelected = selectedDate && d && d.toDateString() === selectedDate.toDateString();
                if (!d) return <div key={i} className="h-10 pointer-events-none" />;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={[
                      "h-10 rounded-lg text-sm transition-all duration-150",
                      isSelected
                        ? "bg-[var(--color-accent)] text-[var(--color-black)] font-medium"
                        : isToday(d)
                        ? "border border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "text-[var(--color-white)] hover:bg-[var(--color-dark)] hover:text-[var(--color-accent)]",
                    ].join(" ")}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-gray-border)]">
            <h3
              className="text-[var(--color-white)] font-light"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Select Time
            </h3>
          </div>
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
                    "h-14 text-sm font-medium transition-all duration-150",
                    showTop ? "border-t border-[var(--color-gray-border)]" : "",
                    showLeft ? "border-l border-[var(--color-gray-border)]" : "",
                    active
                      ? "bg-[var(--color-accent)] text-[var(--color-black)]"
                      : "text-[var(--color-gray-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-dark)]",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Party size */}
        <div className="rounded-2xl border border-[var(--color-gray-border)] bg-[var(--color-dark-alt)] px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-white)]" style={{ fontFamily: "var(--font-heading)" }}>
              Party Size
            </span>
            <div className="flex items-center gap-4">
              <button
                className="w-11 h-11 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-xl"
                onClick={() => setParty((n) => Math.max(1, n - 1))}
                aria-label="Decrease party size"
              >
                −
              </button>
              <span className="w-8 text-center text-[var(--color-white)] text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                {party}
              </span>
              <button
                className="w-11 h-11 rounded-full border border-[var(--color-gray-border)] grid place-content-center text-[var(--color-white)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors text-xl"
                onClick={() => setParty((n) => Math.min(10, n + 1))}
                aria-label="Increase party size"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <button
          disabled={!selectedDate || !time}
          onClick={confirm}
          className="btn-primary w-full text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Reservation
        </button>
      </div>

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] grid place-items-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--color-accent)] bg-[var(--color-dark-alt)] p-8 shadow-2xl text-center">
            <div className="text-3xl mb-2 text-[var(--color-accent)]" style={{ fontFamily: "var(--font-heading)" }}>
              Reservation Confirmed
            </div>
            <div className="section-divider" />
            <p className="text-[var(--color-gray-muted)]">
              Table for <span className="text-[var(--color-white)] font-medium">{party}</span> on{" "}
              <span className="text-[var(--color-white)] font-medium">{prettyDate}</span> at{" "}
              <span className="text-[var(--color-white)] font-medium">{time}</span>
            </p>
            <p className="mt-3 text-xs text-[var(--color-gray-muted)]">
              We look forward to welcoming you.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
