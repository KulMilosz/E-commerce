"use client";

import { useState, useEffect } from "react";
import { QuantitySelectorProps } from "@/app/types";
import Image from "next/image";

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  price,
  stock,
  onChange,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(price * quantity);

  useEffect(() => {
    const newTotal = quantity * price;
    setTotal(newTotal);

    if (onChange) {
      onChange(quantity, newTotal);
    }
  }, [quantity, price, onChange]);

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div>
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
    </div>
  );
};

export default QuantitySelector;
