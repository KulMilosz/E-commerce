"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Category } from "../lib/categories";

interface CategoryCarouselProps {
  categories: Category[];
}

const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!categories.length) {
    return (
      <div className="flex justify-center items-center h-96 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <div className="text-lg">No categories available</div>
        </div>
      </div>
    );
  }

  const currentCategory = categories[currentIndex];

  return (
    <div className="relative w-full max-w-[1360px] mx-auto">
      <div className="relative bg-[#222327] rounded-md border border-[#383B42] overflow-hidden" style={{ height: '452px' }}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 px-30 py-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentCategory.name}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              {currentCategory.exploreInfo}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#F29145] text-sm font-medium">
                {currentCategory.productCount} products available
              </span>
            </div>
            <Link
              href={`/products?category=${currentCategory.name.toLowerCase()}`}
              className="inline-block bg-[#F29145] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 self-start"
            >
              Explore category
            </Link>
          </div>

          <div className="flex-1 relative bg-gray-700 flex items-center justify-center" style={{ height: '452px' }}>
            {currentCategory.image ? (
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📱</div>
                <div className="text-lg">Image placeholder</div>
                <div className="text-sm">for {currentCategory.name}</div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F29145] hover:bg-orange-600 text-black transition-colors duration-300 cursor-pointer"
          style={{
            width: '44px',
            height: '74px',
            padding: '4px 7px',
            borderTopRightRadius: '6px',
            borderBottomRightRadius: '6px'
          }}
          aria-label="Previous category"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F29145] hover:bg-orange-600 text-black transition-colors duration-300 cursor-pointer"
          style={{
            width: '44px',
            height: '74px',
            padding: '4px 7px',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px'
          }}
          aria-label="Next category"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-2.5 space-x-2.5">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-[#F29145]" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;

