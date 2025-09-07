"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
}

interface BrandsProps {
  brands: Brand[];
}

const Brands = ({ brands }: BrandsProps) => {
  const [canScroll, setCanScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleBrands = brands.slice(0, 6);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  if (!brands.length) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <div className="text-lg">No brands available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold">Brand</h2>
          {canScroll && (
            <button
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: scrollRef.current.scrollWidth,
                  behavior: "smooth",
                });
              }}
              className="text-white text-sm font-medium flex items-center gap-2 hover:text-[#F29145] transition-colors duration-300 cursor-pointer"
            >
              See All
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-100"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="w-[calc(50vw-680px)]"></div>
        <div ref={scrollRef} className="flex gap-7 overflow-hidden flex-1">
          {visibleBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="bg-[#262626] border border-[#616674] rounded-md hover:border-[#F29145] transition-colors duration-300 w-55 h-48 flex-shrink-0 flex items-center justify-center cursor-pointer p-3"
            >
              <div className="w-full h-full flex items-center justify-center">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-sm">{brand.name}</div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
