"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "../../types";
import { addToCart } from "@/app/lib/addToCart";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-[#222327] border border-[#383B42] rounded-md overflow-hidden hover:border-[#F29145] transition-colors duration-300 w-75 h-96 flex flex-col cursor-pointer"
    >
      <div className="p-4 pb-0 flex-1">
        <div className="relative w-full h-56 mx-auto flex items-center justify-center rounded-md overflow-hidden bg-white">
          <button
            className="absolute top-3 left-3 bg-[#262626] text-white w-9 h-9 rounded-lg hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product.id);
            }}
          >
            <Image src="/Cart.svg" alt="Add to cart" width={24} height={24} />
          </button>

          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 268px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4h16v16H4V4zm4 4l3 3 5-5 3 3v6H8V8z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 pb-5 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-block bg-[#E5610A] text-white text-text-s font-medium px-2.5 py-1.5 rounded-md w-fit">
            {product.category?.name || "Unknown"}
          </div>
          {product.brand?.logoUrl && (
            <div
              className={
                product.brand.name === "Rexus"
                  ? "relative h-8 w-8 shrink-0"
                  : "relative h-6 w-6 shrink-0"
              }
            >
              <Image
                src={product.brand.logoUrl}
                alt={product.brand.name}
                fill
                className="object-contain"
                sizes={product.brand.name === "Rexus" ? "32px" : "24px"}
              />
            </div>
          )}
        </div>

        <h3 className="text-white text-text-l line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="text-heading-m-5 font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
}
