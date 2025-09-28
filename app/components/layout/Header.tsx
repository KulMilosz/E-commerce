"use client";

import { HeaderNotification } from "../providers/HeaderNotification";
import HeaderActions from "./HeaderActions";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const shouldHideNavigation = () => {
    if (["/register-success", "/login", "/register"].includes(pathname)) {
      return true;
    }
    if (pathname === "/contact" && !session) {
      return true;
    }
    return false;
  };

  return (
    <header className="bg-[#1a1a1a] w-full relative">
      <HeaderActions />
      {!shouldHideNavigation() && <Navigation />}

      <div className="border-t border-[#383B42] mx-4 sm:mx-6 lg:mx-10 ">
        <div className="flex w-full mt-8">
          <HeaderNotification />
        </div>
      </div>
    </header>
  );
};

export default Header;
