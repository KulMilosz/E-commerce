'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductsSidebarProps } from '../../types';

export default function ProductsSidebar({ 
  categories, 
  currentCategory, 
  minPrice, 
  maxPrice 
}: ProductsSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '');

  useEffect(() => {
    setIsMounted(true);
    setIsCategoryOpen(true);
    setIsPriceOpen(true);
  }, []);

  useEffect(() => {
    setLocalMinPrice(minPrice || '');
  }, [minPrice]);

  useEffect(() => {
    setLocalMaxPrice(maxPrice || '');
  }, [maxPrice]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const debouncedUpdateMinPrice = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateFilters('minPrice', value);
        }, 500);
      };
    })(),
    [searchParams, router]
  );

  const debouncedUpdateMaxPrice = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateFilters('maxPrice', value);
        }, 500);
      };
    })(),
    [searchParams, router]
  );

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div>
          <div className="w-full px-4 py-3 flex items-center justify-between text-left">
            <span className="font-medium">Category</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div>
          <div className="w-full px-4 py-3 flex items-center justify-between text-left">
            <span className="font-medium">Price</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors rounded-md"
        >
          <span className="font-medium">Category</span>
          <svg
            className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCategoryOpen && (
          <div className="px-4 pb-4 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="all"
                checked={!currentCategory || currentCategory === 'all'}
                onChange={(e) => updateFilters('category', e.target.value)}
                className="w-4 h-4 text-[#E5610A] bg-transparent border-[#616674] focus:ring-[#E5610A]"
              />
              <span className="text-sm">All</span>
            </label>
            
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={currentCategory === category.id}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="w-4 h-4 text-[#E5610A] bg-transparent border-[#616674] focus:ring-[#E5610A]"
                />
                <span className="text-sm capitalize">{category.name}</span>
              </label>
            ))}
            
            <button className="text-sm text-[#E5610A] hover:text-[#ff7a00] transition-colors">
              Load More +
            </button>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors rounded-md"
        >
          <span className="font-medium">Price</span>
          <svg
            className={`w-4 h-4 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isPriceOpen && (
          <div className="px-4 pb-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localMinPrice}
                  onChange={(e) => {
                    setLocalMinPrice(e.target.value);
                    debouncedUpdateMinPrice(e.target.value);
                  }}
                  className="w-full h-12 px-4 bg-[#1a1a1a] border border-[#616674] rounded-md text-base focus:outline-none focus:border-[#E5610A]"
                />
              </div>
              <div className="relative">
                <select className="h-12 px-4 pr-10 bg-[#1a1a1a] border border-[#616674] rounded-md text-base focus:outline-none focus:border-[#E5610A] appearance-none cursor-pointer">
                  <option>USD</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localMaxPrice}
                  onChange={(e) => {
                    setLocalMaxPrice(e.target.value);
                    debouncedUpdateMaxPrice(e.target.value);
                  }}
                  className="w-full h-12 px-4 bg-[#1a1a1a] border border-[#616674] rounded-md text-base focus:outline-none focus:border-[#E5610A]"
                />
              </div>
              <div className="relative">
                <select className="h-12 px-4 pr-10 bg-[#1a1a1a] border border-[#616674] rounded-md text-base focus:outline-none focus:border-[#E5610A] appearance-none cursor-pointer">
                  <option>USD</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
