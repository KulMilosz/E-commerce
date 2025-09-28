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
    <div className="w-full px-4">
      <h2 className="text-heading-m-4 font-medium mb-8 px-4 md:px-0 lg:invisible">
        Brand
      </h2>

      {/* Grid dla sm i md - POPRAWIONE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:hidden justify-items-center mx-auto max-w-6xl">
        {visibleBrands.map((brand) => (
          <div key={brand.id} className="w-full max-w-xs flex justify-center">
            <BrandCard brand={brand} />
          </div>
        ))}
      </div>

      {/* Slider dla lg i większych */}
      <div className="hidden lg:block">
        <HorizontalSlider title="Brand" seeAllText="See All">
          {visibleBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </HorizontalSlider>
      </div>
    </div>
  );
};

export default Brands;
