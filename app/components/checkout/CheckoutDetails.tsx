"use client";

import React, { useState } from "react";
import {  CheckoutDetailsProps } from "@/app/types";
import ProductCardCart from "../cart/ProductCardCart";
import Image from "next/image";

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  selectedItems,
  itemTotals,
  onItemTotalChange,
  productProtection,
  onProductProtectionChange,
}) => {
  const [addressTab, setAddressTab] = useState<"existing" | "new">("existing");

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6">
        <div className="space-y-4">
          {selectedItems.map((item) => {
            const current = itemTotals[item.id];
            const qty = current ? current.qty : item.quantity;

            return (
              <ProductCardCart
                key={item.id}
                product={item.product}
                quantity={qty}
                showRemoveButton={false}
                onItemTotalChange={(newQty, newTotal) =>
                  onItemTotalChange(item.id, newQty, newTotal)
                }
              />
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#262626] rounded-lg">
          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={productProtection}
              onChange={(e) => onProductProtectionChange(e.target.checked)}
              className="w-6.5 h-6.5 accent-[#F29145] cursor-pointer"
            />
            <div>
              <div className="flex mb-1">
                <span className="text-text-m font-medium ">
                  Product Protection
                </span>
              </div>

              <p className="text-text-s text-[#E7E7E7]">
                The claim process is easy and instant, valid for 6 months
              </p>
            </div>
            <span className="ml-auto text-[#FCFCFC] font-medium text-text-l">
              $1
            </span>
          </label>
        </div>
      </div>
      <span className="text-heading-w-6 font-medium">Address</span>
      <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6">
        <div className="flex border-b border-[#383B42] mb-6 w-full">
          <button
            onClick={() => setAddressTab("existing")}
            className={`pb-3 px-1 font-medium cursor-pointer w-1/2 ${
              addressTab === "existing"
                ? "text-[#F29145] border-b-2 border-[#F29145] text-text-l font-medium"
                : "text-text-l font-medium hover:text-white"
            }`}
          >
            Existing Address
          </button>
          <button
            onClick={() => setAddressTab("new")}
            className={`pb-3 px-1 font-medium ml-6 cursor-pointer w-1/2 ${
              addressTab === "new"
                ? "text-[#F29145] border-b-2 border-[#F29145] text-text-l font-medium "
                : "text-text-l font-medium hover:text-white"
            }`}
          >
            New Address
          </button>
        </div>

        {addressTab === "existing" ? (
          <div>
            <div className="mb-4 flex items-center">
              <span className="text-text-m font-medium">Adress</span>
              <div className="flex">
                <div className="inline-block bg-[#E5610A] text-white text-text-s font-medium px-2.5 py-1.5 rounded-md w-fit cursor-pointer ml-4">
                  Main Adress
                </div>
              </div>
            </div>
            <p className="text-text-l font-medium mt-1">
              Bangalau Road No 23, RT 4/RW 6, Kinajaya
            </p>

            <div className="flex justify-between gap-4 text-sm pt-10 ">
              <div className="flex flex-col gap-2">
                <span className="text-text-m font-medium">Country</span>
                <p className="text-text-l font-medium">Indonesia</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-m font-medium">Province</span>
                <p className="text-text-l font-medium">Jakarta</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-m font-medium">City</span>
                <p className="text-text-l font-medium">Jakarta</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-m font-medium">Postal Code</span>
                <p className="text-text-l font-medium">12819</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Street Address"
              className="w-full p-3 bg-[#1a1a1a] border border-[#383B42] rounded-lg text-white placeholder-gray-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="p-3 bg-[#1a1a1a] border border-[#383B42] rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="p-3 bg-[#1a1a1a] border border-[#383B42] rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
        )}
      </div>
      <h2 className="text-heading-w-6 font-medium ">Shipping</h2>
      <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6">
        <div className="flex gap-2 items-center justify-start">
          <Image
            src="/shield-cross.svg"
            alt="Shield Icon"
            width={24}
            height={24}
          />
          <span className="text-text-l font-medium">NexusHub Courier</span>
        </div>
      </div>
      <h2 className="text-heading-w-6 font-medium ">Payment Method</h2>
      <div className="bg-[#262626] border border-[#383B42] rounded-lg p-6">
        <div className="flex gap-2 items-center justify-start">
          <Image src="/apple.svg" alt="Shield Icon" width={46} height={30} />
          <span className="text-text-l font-medium">Apple Pay</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
