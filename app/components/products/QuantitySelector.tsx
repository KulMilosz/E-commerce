"use client";

import { useState, useEffect } from "react";
import { QuantitySelectorProps } from "@/app/types";
import Image from "next/image";

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  price,
  stock,
  onChange,
  onClick,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(price * quantity);

  useEffect(() => {
    const newTotal = quantity * price;
    setTotal(parseFloat(newTotal.toFixed(2)));

    if (onChange) {
      onChange(quantity, newTotal);
    }
  }, [quantity, price, onChange]);

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increase = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  };

  return (
    <div className="flex flex-col mr-6">
      <span className="text-[#B0B0B0] text-text-l font-medium">Quantity</span>
      <div className="flex items-center mt-5 space-x-4">
        <div className="flex items-center w-35 h-13 border-1 rounded-xl">
          <button
            onClick={decrease}
            className="flex items-center justify-center w-1/3 h-full cursor-pointer"
          >
            <Image src="/minus.svg" alt="Minus" width={24} height={24} />
          </button>
          <span className="flex-1 text-center font-medium">{quantity}</span>
          <button
            onClick={increase}
            className="flex items-center justify-center w-1/3 h-full cursor-pointer"
          >
            <Image src="/plus.svg" alt="Plus" width={24} height={24} />
          </button>
        </div>
        <span className="text-text-m font-medium">Stock: {stock}</span>
      </div>
      <div className="my-8 mr-6 flex justify-between items-center">
        <span className="text-text-l font-medium text-[#B0B0B0]">Subtotal</span>
        <span className="text-heading-w-5 font-medium">${total}</span>
      </div>
      <button
        onClick={onClick}
        disabled={stock === 0}
        className={`flex h-14 w-full items-center justify-center  mb-6 rounded-lg space-x-3 transition-colors
    border ${
      stock > 0
        ? "border-[#F29145] hover:border-orange-200 cursor-pointer"
        : "border-gray-300 cursor-not-allowed"
    }`}
      >
        <span
          className={`text-text-m font-medium ${
            stock > 0 ? "text-[#F29145]" : "text-gray-400"
          }`}
        >
          Add to Cart
        </span>
        <Image src="/cart-4.svg" alt="Cart" width={24} height={24} />
      </button>
    </div>
  );
};

export default QuantitySelector;
