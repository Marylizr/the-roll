import OrderClient from "./OrderClient";

export const metadata = {
  title: "Order Online",
  description:
    "Order from The Roll's full menu online — signature rolls, sashimi, makis, and beverages delivered or ready for pickup.",
};

export default function OrderPage() {
  return <OrderClient />;
}
