"use client";

import React from "react";
import { OrderSummaryProps } from "@/app/types";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedItems,
  itemTotals,
  onPayNow,
  productProtection,
}) => {
  const totalProductPrice = selectedItems.reduce((sum, item) => {
    const current = itemTotals[item.id];
    const total = current ? current.total : item.quantity * item.product.price;
    return sum + total;
  }, 0);

  const totalQuantity = selectedItems.reduce((sum, item) => {
    const current = itemTotals[item.id];
    const qty = current ? current.qty : item.quantity;
    return sum + qty;
  }, 0);

  const productProtectionPrice = productProtection ? 1 : 0;
  const shippingPrice = 5;
  const shippingInsurance = 6;
  const transactionFees = totalQuantity * 0.5;

  const grandTotal =
    totalProductPrice +
    productProtectionPrice +
    shippingPrice +
    shippingInsurance +
    transactionFees;

  return (
    <div className="text-lg font-semibold flex flex-col gap-4 p-6 ml-12 mr-10 bg-[#262626] border-1 border-[#383B42] rounded-lg min-w-100 min-h-70 justify-between">
      <div className="space-y-3">
        <h3 className="text-text-l font-medium">Total Product</h3>
        <div className="flex justify-between items-center">
          <span className="text-text-m font-medium text-[#E7E7E7]">
            Total Product Price
          </span>
          <span className="text-text-l font-medium">
            ${totalProductPrice.toFixed(2)}
          </span>
        </div>

        {productProtection && (
          <div className="flex justify-between items-center">
            <span className="text-text-m font-medium text-[#E7E7E7]">
              Total Product Protection
            </span>
            <span className="text-text-l font-medium">
              ${productProtectionPrice.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-text-m font-medium text-[#E7E7E7]">
            Total Shipping Price
          </span>
          <span className="text-text-l font-medium">
            ${shippingPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-m font-medium text-[#E7E7E7]">
            Shipping Insurance
          </span>
          <span className="text-text-l font-medium">
            ${shippingInsurance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-[#383B42] pt-4">
        <div className="space-y-3">
          <h3 className="text-text-m font-medium text-white">
            Transaction Fees
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-text-m font-medium text-[#E7E7E7]">
              Service Fees
            </span>
            <span className="text-text-l font-medium">
              ${transactionFees.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#383B42] mt-2 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-text-l font-medium text-[#FCFCFC]">
            Grand Total
          </span>
          <span className="lg:text-heading-w-5 text-heading-m-5 font-medium text-[#FCFCFC]">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onPayNow}
        className="flex justify-center items-center bg-[#F29145] p-4 rounded-lg text-[#262626] text-text-m font-medium cursor-pointer hover:bg-[#E5610A] transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
};

export default OrderSummary;
