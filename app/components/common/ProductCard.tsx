'use client';

import Image from 'next/image';
import { ProductWithNumericPrice } from '../../types';

interface ProductCardProps {
  product: ProductWithNumericPrice;
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <div className="group bg-[#222327] border border-[#383B42] rounded-md overflow-hidden hover:border-[#F29145] transition-colors duration-300 w-75 h-96 flex-shrink-0 flex flex-col cursor-pointer">
      <div className="p-4 flex-1">
        <div className="relative w-67 h-56 mx-auto flex items-center justify-center rounded-md overflow-hidden bg-white">
          <button
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
        <div className="inline-block bg-[#E5610A] text-white text-sm px-2.5 py-1.5 rounded-md w-fit">
          {product.category?.name || 'Unknown'}
        </div>
        <h3 className="text-white font-medium line-clamp-2">
          {product.name}
        </h3>
        <div className="text-[#F29145] font-bold text-lg">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
