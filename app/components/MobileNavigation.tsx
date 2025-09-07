"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const pathname = usePathname();
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-[#1a1a1a] border-t border-[#383B42]">
      <nav className="px-4 py-6 space-y-4">
        <Link 
          href="/" 
          className={`block hover:text-orange-400 font-medium text-xl py-3 ${
            pathname === "/" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          href="/products" 
          className={`block hover:text-orange-400 font-medium text-xl py-3 ${
            pathname === "/products" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
          onClick={onClose}
        >
          Product
        </Link>
        <Link 
          href="/contact" 
          className={`block hover:text-orange-400 font-medium text-xl py-3 ${
            pathname === "/contact" ? "text-[#F29145]" : "text-[#B0B0B0]"
          }`}
          onClick={onClose}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
