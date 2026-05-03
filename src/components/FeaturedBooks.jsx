"use client";
import { useState } from "react";
import books from "../data/books.json";
import BookCard from "./BookCard";
import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["400", "600", "900"],
  display: 'swap'
});

export default function FeaturedBooks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={`${outfit.className} max-w-7xl mx-auto px-6 py-16 antialiased`}>
      
  
      <div className="relative flex overflow-hidden bg-black border-[3px] border-black rounded-[24px] mb-12 h-14 items-center">
        
        {/* Fixed Label */}
        <div className="absolute left-0 top-0 bottom-0 z-20 bg-blue-600 flex items-center px-6 border-r-[3px] border-black">
          <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">Latest Quotes</span>
        </div>

        {/* Scrolling Content */}
        <div className="relative flex items-center overflow-hidden w-full">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-sharp-marquee {
              display: flex;
              white-space: nowrap;
              animation: marquee 40s linear infinite;
            }
          `}} />
          
          <div className="animate-sharp-marquee ml-[140px]">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                <span className="text-[12px] font-bold tracking-tight text-white flex items-center uppercase">
                  <span className="text-blue-500 font-black mx-6 text-lg">✦</span>
                  "A reader lives a thousand lives before he dies" 
                  <span className="text-blue-400 font-black ml-3">— George R.R. Martin</span>
                  
                  <span className="text-blue-500 font-black mx-10 text-lg">✦</span>
                  "Books are a uniquely portable magic" 
                  <span className="text-blue-400 font-black ml-3">— Stephen King</span>
                  
                  <span className="text-blue-500 font-black mx-10 text-lg">✦</span>
                  "Today a reader, tomorrow a leader" 
                  <span className="text-blue-400 font-black ml-3">— Margaret Fuller</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-[3px] border-black pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-black tracking-tighter uppercase leading-none">
            Featured <span className="text-blue-600">Books</span>
          </h2>
          <p className="text-black text-[12px] font-black uppercase tracking-[0.2em] mt-3 opacity-60">
            Handpicked for your professional collection
          </p>
        </div>

        {/* Search Bar - Sharp Style */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="SEARCH BY TITLE..."
            className="w-full pl-12 pr-6 py-4 bg-white border-[3px] border-black rounded-[18px] text-sm font-bold text-black focus:bg-blue-50 transition-all outline-none placeholder:text-gray-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        </div>
      </div>

      {/* --- BOOKS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(0, 8).map((book) => (
            <div key={book.id} className="transition-transform hover:-translate-y-2 duration-300">
                <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 border-[3px] border-dashed border-black rounded-[40px]">
            <p className="text-black text-xl font-black uppercase tracking-widest italic opacity-20">
                No results found for "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center md:justify-end">
        <Link href="/books" className="group px-10 py-5 bg-black text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-[20px] flex items-center gap-3 transition-all hover:bg-blue-600 active:scale-95">
          Explore Full Collection 
          <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}