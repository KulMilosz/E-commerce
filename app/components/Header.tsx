"use client";

import React, { useState } from "react";
import HeaderActions from "./HeaderActions";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a1a1a] w-full">
      <HeaderActions 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Navigation />
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="border-t border-[#383B42] mx-4 sm:mx-6 lg:mx-10"></div>
    </header>
  );
};

export default Header;
