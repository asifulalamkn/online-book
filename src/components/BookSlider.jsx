"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BookCard from "./BookCard";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BookSlider({ books }) {
  return (
    <div className="w-full py-10 px-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} 
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        
        breakpoints={{
          320: {
            slidesPerView: 1.2, 
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },

          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="pb-16"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} className="h-full">
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>

    
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          width: 45px !important;
          height: 45px !important;
          border: 3px solid black;
          border-radius: 50%;
          color: black !important;
          box-shadow: 4px 4px 0px black;
        }
        
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: 900;
        }

        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: #2563eb;
          color: white !important;
          transform: translate(2px, 2px);
          box-shadow: 0px 0px 0px black;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #000;
          opacity: 0.2;
        }

        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          opacity: 1;
          width: 25px;
          border-radius: 10px;
        }


        @media (max-width: 640px) {
          .swiper-button-next, .swiper-button-prev {
            display: none; 
          }
        }
      `}</style>
    </div>
  );
}