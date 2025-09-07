"use client";

import React from "react";
import Link from "next/link";
import { Category } from "../../generated/prisma";

interface CategoryGridProps {
  categories: (Category & { productCount: number })[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      Mouse: "/mouse.svg",
      Monitor: "/monitor.svg", 
      Headphone: "/headphone.svg",
      Keyboard: "/keyboard.svg",
      Webcam: "/webcam.svg",
    };
    
    return iconMap[categoryName] || "/mouse.svg";
  };

  if (!categories.length) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <div className="text-lg">No categories available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] mx-auto">
      <h2 className="text-white text-2xl font-bold mb-8">Category</h2>
      
      <div className="flex justify-between w-full max-w-[1360px] h-48">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.name.toLowerCase()}`}
            className="group bg-[#222327] border border-[#383B42] rounded-md hover:border-[#F29145] transition-colors duration-300 w-[220px] h-[190px] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={getCategoryIcon(category.name)}
                  alt={`${category.name} icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-sm font-medium group-hover:text-[#F29145] transition-colors duration-300">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
