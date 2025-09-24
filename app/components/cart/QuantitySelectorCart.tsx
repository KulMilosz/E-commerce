"use client";

import { useState, useCallback } from "react";
import { QuantitySelectorProps } from "@/app/types";
import Image from "next/image";

const QuantitySelectorCart: React.FC<QuantitySelectorProps> = ({
  price,
  stock,
  onChange,
  initialQuantity = 1,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleChange = useCallback(
    (newQuantity: number) => {
      const newTotal = parseFloat((newQuantity * price).toFixed(2));
      onChange?.(newQuantity, newTotal);
    },
    [price, onChange]
  );

  const decrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    handleChange(newQuantity);
  };

  const increase = () => {
    const newQuantity = quantity < stock ? quantity + 1 : quantity;
    setQuantity(newQuantity);
    handleChange(newQuantity);
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
    </div>
  );
};

export default QuantitySelectorCart;
