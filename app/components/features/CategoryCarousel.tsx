"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryCarouselProps } from "@/app/types";

const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
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
    <div className="relative w-full">
      <div className="relative bg-[#222327] rounded-md border border-[#383B42] overflow-hidden h-96 md:h-[500px]">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 px-4 md:pl-32 md:pr-12 py-8 md:pt-32 md:pb-20 flex flex-col justify-center">
            <h2 className=" md:text-4xl lg:text-heading-w-4 text-heading-m-4 font-medium mb-4 md:mb-6 text-[#E7E7E7]">
              {currentCategory.name}
            </h2>
            <p className=" text-text-m md:text-lg mb-6 md:mb-8 leading-relaxed font-normal text-[#E7E7E7]">
              {currentCategory.exploreInfo}
            </p>
            <Link
              href={`/products?category=${currentCategory.id}`}
              className="inline-flex bg-[#222327] border border-[#F29145] text-[#F29145] hover:bg-[#F29145] hover:text-black w-full sm:w-52 h-12 sm:h-14 rounded-md transition-colors duration-300 self-start items-center justify-center gap-3.5 font-medium text-sm sm:text-base py-3 sm:py-3.5 px-4 sm:px-5"
            >
              <span className="text-text-m font-medium whitespace-nowrap">
                Explore Category
              </span>
              <Image
                src="/arrow-right.svg"
                alt="arrow right"
                width={24}
                height={24}
                className="opacity-100"
              />
            </Link>
          </div>

          <div
            className="flex-1 relative bg-transparent flex items-center justify-center"
            style={{ height: "500px" }}
          >
            {currentCategory.image ? (
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                width={currentCategory.name === "Mouse" ? 450 : 800}
                height={currentCategory.name === "Mouse" ? 800 : 500}
                className="w-full h-full"
                style={{
                  transform:
                    currentCategory.name === "Mouse"
                      ? "rotate(-34.55deg) translateY(-60px)"
                      : "none",
                  objectFit:
                    currentCategory.name === "Mouse" ? "contain" : "cover",
                  background: "transparent",
                }}
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
            width: "44px",
            height: "74px",
            padding: "4px 7px",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
          aria-label="Previous category"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F29145] hover:bg-orange-600 text-black transition-colors duration-300 cursor-pointer"
          style={{
            width: "44px",
            height: "74px",
            padding: "4px 7px",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
          }}
          aria-label="Next category"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-2.5 space-x-2.5">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
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
