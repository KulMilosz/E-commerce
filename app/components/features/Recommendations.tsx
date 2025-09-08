"use client";

import React, { useState, useRef, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { ProductWithNumericPrice } from "../../types";

interface RecommendationsProps {
  products: ProductWithNumericPrice[];
}

const Recommendations = ({ products }: RecommendationsProps) => {
  const [canScroll, setCanScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleProducts = products.slice(0, 6);

  const addToCart = (productName: string) => {
    console.log(`${productName} added to cart!`);
  };

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

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <div className="text-lg">No products available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Recommendation</h2>
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
        <div ref={scrollRef} className="flex gap-6 overflow-hidden flex-1">
         {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(productId) => {
              addToCart(product.name);
            }}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
