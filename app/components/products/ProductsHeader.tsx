'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductsHeaderProps } from '../../types';

export default function ProductsHeader({ sortBy, show }: ProductsHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-start mb-6 pl-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => updateSort('sortBy', e.target.value)}
            className="px-3 py-2 bg-[#1a1a1a] border border-[#616674] rounded text-sm focus:outline-none focus:border-[#E5610A]"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-400">Show:</label>
          <select
            value={show}
            onChange={(e) => updateSort('show', e.target.value)}
            className="px-3 py-2 bg-[#1a1a1a] border border-[#616674] rounded text-sm focus:outline-none focus:border-[#E5610A]"
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
  );
}
