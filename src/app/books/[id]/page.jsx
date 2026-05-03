"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import booksData from "../../../data/books.json"; // ৩টি ডট নিশ্চিত করুন
import Image from "next/image";

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // ১. প্রাইভেট রাউট প্রোটেকশন
    if (!isPending && !session) {
      router.push("/login");
    }

    // ২. ডাটা ফিল্টার করা
    if (id && booksData) {
      const foundBook = booksData.find((b) => b.id === parseInt(id));
      setBook(foundBook);
    }
  }, [id, session, isPending, router]);

  const handleBorrow = () => {
    alert(`Success! "${book?.title}" has been borrowed.`);
  };

  // ডাটা না আসা পর্যন্ত এরর এড়ানোর জন্য এই চেকটি জরুরি
  if (isPending || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-bold text-gray-400 uppercase tracking-widest">
        Loading Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:py-20">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-[32px] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* 🖼️ Left: Image Section */}
          <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative w-full aspect-[3/4] max-w-[350px] shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
              <img
                src={book?.image_url} 
                alt={book?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 📝 Right: Details Section */}
          <div className="md:w-1/2 p-8 md:p-14">
            <div className="mb-6">
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                {book?.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 uppercase">
              {book?.title}
            </h1>
            
            <p className="text-lg text-gray-500 font-medium mb-8">
              by <span className="text-black font-bold">{book?.author}</span>
            </p>

            <div className="h-[1px] bg-gray-100 w-full mb-8"></div>

            <p className="text-gray-600 leading-relaxed mb-10">
              {book?.description || "No description available for this book. A great choice for your next read!"}
            </p>

            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${book?.available_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className="text-sm font-bold text-gray-700">
                  {book?.available_quantity > 0 
                    ? `${book?.available_quantity} Copies available` 
                    : "Out of Stock"}
                </p>
              </div>

              <button
                onClick={handleBorrow}
                disabled={book?.available_quantity === 0}
                className="w-full md:w-max px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all disabled:bg-gray-200"
              >
                Borrow This Book
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}