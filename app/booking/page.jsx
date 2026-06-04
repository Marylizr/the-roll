import BookingClient from "./BookingClient";

export const metadata = {
  title: "Reservations",
  description:
    "Reserve your table at The Roll. Choose your date, time, and party size for an unforgettable dining experience in Westbury, NY.",
};

export default function BookingPage() {
  return <BookingClient />;
}
