"use client";

import { useState } from "react";
import books from "../../data/books.json"; 
import BookCard from "../../components/BookCard";

export default function AllBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* 📂 Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 md:p-8 shrink-0">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Categories</h3>
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all text-left whitespace-nowrap ${
                selectedCategory === cat 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* 📚 Main Content */}
      <main className="flex-grow p-4 md:p-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 text-black">
              Explore <span className="text-blue-600">Library</span>
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full px-10 py-4 md:px-12 md:py-5 bg-white border border-gray-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all text-sm md:text-base text-black"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            </div>
          </div>

          {/* 📱 Mobile Responsive Grid (2 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-[32px]">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No books found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}