"use client";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Background with Library Image and Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        {/* Modern Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="text-left space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Digital Library 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Discover Your Next <br />
            <span className="text-blue-500 italic">Great Adventure</span>
          </h1>

          <p className="text-gray-300 text-sm md:text-lg max-w-md font-medium leading-relaxed">
            Access thousands of digital books instantly. From timeless classics to modern tech guides, find the knowledge you need today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/books">
              <button className="group relative px-8 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                <span className="relative z-10 flex items-center gap-2">
                  Browse Collection
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </Link>

            <Link href="/register">
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                Join Now
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Floating Cards (Right Side - Desktop Only) */}
        <div className="hidden md:flex justify-end relative">
          <div className="relative w-64 h-80 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group">
             <div className="w-full h-40 bg-gray-800 rounded-2xl mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Featured" />
             </div>
             <div className="space-y-2">
                <div className="h-2 w-20 bg-blue-500 rounded-full"></div>
                <div className="h-2 w-full bg-white/20 rounded-full"></div>
                <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
             </div>
          </div>
          {/* Smaller floating element */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 backdrop-blur-3xl rounded-full border border-blue-500/20 -z-10 animate-pulse"></div>
        </div>

      </div>

      {/* Bottom Fade Effect to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}