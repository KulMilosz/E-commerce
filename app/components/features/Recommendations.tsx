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
    <HorizontalSlider title="Recommendation" seeAllText="See All">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </HorizontalSlider>
  );
};

export default Recommendations;
