import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import { Outfit } from "next/font/google";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400", "900"],
  display: 'swap'
});

export const metadata = {
  title: "BookFlow | Online Book Borrowing Platform",
  description: "Discover and borrow your favorite books easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${outfit.className} min-h-screen flex flex-col bg-white text-black antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}