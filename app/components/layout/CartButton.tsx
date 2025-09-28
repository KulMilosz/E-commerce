"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const router = useRouter();
  return (
    <button
      className="p-2 hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <Image
        src="/Cart.svg"
        alt="Cart"
        width={24}
        height={24}
        className="text-white"
      />
    </button>
  );
};

export default CartButton;
