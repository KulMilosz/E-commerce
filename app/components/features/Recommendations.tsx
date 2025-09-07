"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../../generated/prisma";

type ProductWithNumericPrice = Omit<Product, 'price'> & {
  price: number;
  category: {
    name: string;
  };
};

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
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-[#222327] border border-[#383B42] rounded-md overflow-hidden hover:border-[#F29145] transition-colors duration-300 w-75 h-96 flex-shrink-0 flex flex-col cursor-pointer"
          >
            <div className="p-4 flex-1">
              <div className="relative w-67 h-56 mx-auto flex items-center justify-center rounded-md overflow-hidden bg-white">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product.name);
                  }}
                  className="absolute top-2 left-2 bg-black text-white w-8 h-8 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                >
                  <Image src="/Cart.svg" alt="Add to cart" width={20} height={20} />
                </button>
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={268}
                    height={204}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📱</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 pt-4 pb-5 flex flex-col gap-2">
              <div className="inline-block bg-[#E5610A] text-white text-sm px-2.5 py-1.5 rounded-md w-fit">{product.category?.name || 'Unknown'}</div>
              <h3 className="text-white font-medium line-clamp-2">{product.name}</h3>
              <div className="text-[#F29145] font-bold text-lg">
                ${product.price.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
