"use client";

import React from "react";
import Logo from "./Logo";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";
import MobileMenuButton from "./MobileMenuButton";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const HeaderActions = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderActionsProps) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-10">
      <Logo />
      <div className="flex items-center">
        <CartButton />
        <UserAvatar />
        <div className="md:hidden">
          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderActions;
