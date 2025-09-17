"use client";

import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  route?: string;
  label: string;
};

const Button = ({ route, label, onClick, ...rest }: ButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (route) {
      router.push(route);
    } else if (onClick) {
      onClick(e);
    } else {
      console.warn("⚠️ Button clicked but no route or onClick provided.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-30 h-13 bg-[#F29145] text-black text-text-m font-medium rounded-lg cursor-pointer"
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
