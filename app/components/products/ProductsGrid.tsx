"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../common/ProductCard";
import { ProductsGridProps } from "../../types";

export default function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/products?${params.toString()}`);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No products found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sortBy"
              className="text-xl font-semibold text-[#FCFCFC] leading-7 tracking-tight"
            >
              Sort by:
            </label>
            <select
              id="sortBy"
              value={searchParams.get("sortBy") || "latest"}
              onChange={(e) => updateFilters("sortBy", e.target.value)}
              className="w-31.5 h-11 bg-[#262626] border border-[#616674] rounded-md px-4 py-2.5 text-sm text-[#FCFCFC] text-left focus:outline-none focus:border-[#E5610A] appearance-none cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label
              htmlFor="show"
              className="text-xl font-semibold text-[#FCFCFC] leading-7 tracking-tight"
            >
              Show:
            </label>
            <select
              id="show"
              value={searchParams.get("show") || "9"}
              onChange={(e) => updateFilters("show", e.target.value)}
              className="w-31.5 h-11 bg-[#262626] border border-[#616674] rounded-md px-4 py-2.5 text-sm text-[#FCFCFC] text-left focus:outline-none focus:border-[#E5610A] appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FCFCFC' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m5 7 5 5 5-5'/%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                backgroundSize: "20px 20px",
              }}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
