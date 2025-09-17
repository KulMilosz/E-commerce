"use client";

import React from "react";
import Logo from "./Logo";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";
import Button from "../common/Button";

const HeaderActions = () => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-10">
      <Logo />
      <div className="flex items-center">
        {/* <CartButton />
        <UserAvatar /> */}
        <Button route="login" label="Sign In" />
      </div>
    </div>
  );
};

export default HeaderActions;
