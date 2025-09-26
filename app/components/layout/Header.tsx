"use client";

import { HeaderNotification } from "../providers/HeaderNotification";
import HeaderActions from "./HeaderActions";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-[#1a1a1a] w-full">
      <HeaderActions />
      {!["/register-success", "/login", "/register"].includes(pathname) && (
        <Navigation />
      )}

      <div className="border-t border-[#383B42] mx-4 sm:mx-6 lg:mx-10 ">
        <div className="flex w-full mt-8">
          <HeaderNotification />
        </div>
      </div>
    </header>
  );
};

export default Header;
