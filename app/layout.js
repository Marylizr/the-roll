import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Roll",
  description: "Sushi place — mock for portfolio",
  icons: {
    icon: "https://res.cloudinary.com/da6il8qmv/image/upload/v1760376080/favIcon_urqhgd.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

