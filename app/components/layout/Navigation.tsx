"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-8 px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
      <Link 
        href="/" 
        className={`hover:text-orange-400 font-medium text-lg sm:text-xl ${
          pathname === "/" ? "text-[#F29145]" : "text-[#B0B0B0]"
        }`}
      >
        Home
      </Link>
      <Link 
        href="/products" 
        className={`hover:text-orange-400 font-medium text-lg sm:text-xl ${
          pathname === "/products" ? "text-[#F29145]" : "text-[#B0B0B0]"
        }`}
      >
        Product
      </Link>
      <Link 
        href="/contact" 
        className={`hover:text-orange-400 font-medium text-lg sm:text-xl ${
          pathname === "/contact" ? "text-[#F29145]" : "text-[#B0B0B0]"
        }`}
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;
