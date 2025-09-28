"use client";

import React from "react";
import HorizontalSlider from "../common/HorizontalSlider";
import ProductCard from "../common/ProductCard";
import { RecommendationsProps } from "../../types";

const Recommendations = ({ products }: RecommendationsProps) => {
  const visibleProducts = products.slice(0, 6);

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
      <h2 className="text-heading-m-4 font-medium mb-8 px-4 lg:px-0 lg:invisible">
        Recommendations
      </h2>

      {/* Grid dla sm i md */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md: lg:hidden justify-items-center">
        {visibleProducts.map((product) => (
          <div key={product.id} className="w-full max-w-xs">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Slider dla lg i większych */}
      <div className="hidden lg:block">
        <HorizontalSlider title="Recommendations" seeAllText="See All">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalSlider>
      </div>
    </div>
  );
};

export default Recommendations;
