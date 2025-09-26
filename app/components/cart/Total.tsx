"use client";

import React from "react";
import { CartItem, TotalProps } from "@/app/types";
import { useRouter } from "next/navigation";

const Total: React.FC<TotalProps> = ({ cartItems, selected, itemTotals }) => {
  const selectedItems = cartItems.filter((i) => selected.includes(i.id));

  const grandTotal = selectedItems.reduce((sum, i) => {
    const current = itemTotals[i.id];
    const lineTotal = current ? current.total : i.quantity * i.product.price;
    return sum + lineTotal;
  }, 0);

  const router = useRouter();

  return (
    <div className="text-lg font-semibold flex flex-col gap-4 p-6 ml-12 mr-10 bg-[#262626] border-1 border-[#383B42] rounded-lg min-w-100 min-h-70 justify-between">
      <span className="text-text-l font-medium">Total Product:</span>

      {selectedItems.map((item) => {
        const current = itemTotals[item.id];
        const qty = current ? current.qty : item.quantity;
        const total = current
          ? current.total
          : item.quantity * item.product.price;

        return (
          <div
            key={item.id}
            className="flex justify-between items-center gap-8"
          >
            <div className="flex flex-col">
              <span className="whitespace-nowrap font-medium text-text-m text-[#F29145] ">
                {item.product.name}
              </span>
              <span className="text-sm text-gray-400">({qty})</span>
            </div>

            <div className="flex items-center">
              <span className="text-lg font-medium">${total.toFixed(2)}</span>
            </div>
          </div>
        );
      })}

      <div className="border-t border-[#383B42] mt-4 pt-2 flex justify-between">
        <span className="font-semibold">Subtotal:</span>
        <span className="font-semibold">${grandTotal.toFixed(2)}</span>
      </div>
      <button
        onClick={() => {
          if (selected.length === 0) {
            return;
          }
          const selectedParams = selected.join(",");
          router.push(`/checkout?selected=${selectedParams}`);
        }}
        className={`flex justify-center items-center p-3 rounded-lg text-text-m font-medium ${
          selected.length === 0
            ? "bg-gray-600 text-gray-400 "
            : "bg-[#F29145] text-[#262626] cursor-pointer hover:bg-[#E5610A]"
        }`}
        disabled={selected.length === 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default Total;
