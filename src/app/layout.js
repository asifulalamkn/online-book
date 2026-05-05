import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import { Outfit } from "next/font/google";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"], // Added more weights for better design flexibility
  display: 'swap'
});

export const metadata = {
  title: "BookFlow | Online Book Borrowing Platform",
  description: "Discover and borrow your favorite books easily.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning here covers the html/body attributes
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${outfit.className} min-h-screen bg-white text-black antialiased`}
        suppressHydrationWarning
      >
        {/* Wrapping in a fragment or div helps isolate layout shifts */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}