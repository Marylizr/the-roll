import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata = {
  title: {
    default: "The Roll — Modern Japanese Cuisine",
    template: "%s | The Roll",
  },
  description:
    "Experience avant-garde sushi and Japanese fusion cuisine at The Roll. Handcrafted rolls, premium sashimi, and an elegant ambiance in Westbury, NY.",
  keywords: ["sushi", "japanese cuisine", "fusion", "westbury", "The Roll", "sashimi"],
  openGraph: {
    title: "The Roll — Modern Japanese Cuisine",
    description:
      "Handcrafted rolls, premium sashimi, and an elegant ambiance. Where tradition meets innovation.",
    url: "https://the-roll.netlify.app",
    siteName: "The Roll",
    images: [
      {
        url: "https://res.cloudinary.com/da6il8qmv/image/upload/f_auto,q_auto,w_1200/v1760380887/banner_ohqx3y.svg",
        width: 1200,
        height: 630,
        alt: "The Roll — Modern Japanese Cuisine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
