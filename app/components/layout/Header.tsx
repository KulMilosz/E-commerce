"use client";

import HeaderActions from "./HeaderActions";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-[#1a1a1a] w-full">
      <HeaderActions />
      <Navigation />
      <div className="border-t border-[#383B42] mx-4 sm:mx-6 lg:mx-10"></div>
    </header>
  );
};

export default Header;
