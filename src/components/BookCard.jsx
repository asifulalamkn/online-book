"use client";
import Link from "next/link"; 

export default function BookCard({ book }) {
  if (!book) return null;
  const { id, title, author, image_url, category, available_quantity } = book;

  return (
    <div className="group bg-white rounded-[24px] overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
      
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden m-3 rounded-[20px] bg-gray-50">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-md text-black text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/*Content Section */}
      <div className="px-5 pb-6 pt-2 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
            available_quantity > 0 
            ? 'bg-green-50 text-green-600' 
            : 'bg-red-50 text-red-600'
          }`}>
            {available_quantity > 0 ? `● ${available_quantity} In Stock` : '○ Out of Stock'}
          </span>
        </div>

        <h3 className="text-gray-900 font-bold text-lg leading-snug line-clamp-2 min-h-[48px] transition-colors group-hover:text-blue-600">
          {title}
        </h3>
        
        <p className="text-gray-400 text-[12px] mt-1 font-medium italic">
          by <span className="text-gray-600 not-italic font-bold">{author}</span>
        </p>
        
        <div className="mt-auto pt-6">
          <Link 
            href={`/books/${id}`} 
            className="group/btn relative flex items-center justify-center w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl overflow-hidden transition-all active:scale-95"
          >
            <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              View Details 
              <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}