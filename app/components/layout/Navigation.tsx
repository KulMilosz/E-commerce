"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-8 px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
        <Link
          href="/"
          className={`hover:text-orange-400 text-text-m font-semibold sm:text-xl ${
            pathname === "/" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`hover:text-orange-400 text-text-m font-semibold sm:text-xl  ${
            pathname === "/products" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
        >
          Product
        </Link>
        <Link
          href="/contact"
          className={`hover:text-orange-400 text-text-m font-semibold sm:text-xl  ${
            pathname === "/contact" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
        >
          Contact
        </Link>
      </nav>

      <div className="md:hidden px-4 pb-6 flex justify-end">
        <button
          onClick={toggleMobileMenu}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#B0B0B0] transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#B0B0B0] transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#B0B0B0] transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        <div
          className={`absolute top-full left-0 right-0 bg-[#1a1a1a] border-t border-[#383B42] transition-all duration-300 z-50 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`hover:text-orange-400 text-text-m font-semibold py-2 ${
                pathname === "/" ? "text-[#F29145]" : "text-[#B0B0B0]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className={`hover:text-orange-400 text-text-m font-semibold py-2 ${
                pathname === "/products" ? "text-[#F29145]" : "text-[#B0B0B0]"
              }`}
            >
              Product
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={`hover:text-orange-400 text-text-m font-semibold py-2 ${
                pathname === "/contact" ? "text-[#F29145]" : "text-[#B0B0B0]"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
