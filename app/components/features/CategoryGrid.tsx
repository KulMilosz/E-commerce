"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryGridProps } from "@/app/types";

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
    <div className="w-full">
      <h2 className="text-heading-m-4 font-medium mb-8 px-4 lg:px-0">
        Category
      </h2>

      <div className="flex flex-wrap justify-between w-full gap-4 px-8 lg:px-0">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group bg-[#222327] border border-[#383B42] rounded-md hover:border-[#F29145] transition-colors duration-300 
                 w-full sm:w-[calc(50%-0.5rem)]  lg:w-[calc(20%-0.8rem)] h-48 
                 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={getCategoryIcon(category.name)}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-heading-m-6 font-medium group-hover:text-[#F29145] transition-colors duration-300">
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
