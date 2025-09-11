"use client";

import React from "react";
import HorizontalSlider from "../common/HorizontalSlider";
import BrandCard from "../common/BrandCard";
import { BrandsProps } from "@/app/types";

const Brands = ({ brands }: BrandsProps) => {
  const visibleBrands = brands.slice(0, 6);

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
    <HorizontalSlider title="Brand" seeAllText="See All">
      {visibleBrands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </HorizontalSlider>
  );
};

export default Brands;
