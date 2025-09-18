"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";
import Button from "../common/Button";

const HeaderActions = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-10">
      <Logo />
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="w-20 h-10 bg-gray-700 rounded animate-pulse"></div>
        ) : session ? (
          <div className="flex justify-center items-center">
            <CartButton />
            <UserAvatar />
          </div>
        ) : (
          <Button route="login" label="Sign In" />
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
