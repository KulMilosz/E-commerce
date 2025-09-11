"use client";

import React from "react";
import Card from "./Card";
import Image from "next/image";
import { BrandCardProps } from "@/app/types";

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card
      href={`/brands/${brand.id}`}
      className="w-55 h-48 flex items-center justify-center p-3"
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-7">
        {brand.logoUrl ? (
          <>
            <div
              className="relative w-full"
              style={{ height: 46, maxWidth: 200, minWidth: 80 }}
            >
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 150px, 200px"
                priority
              />
            </div>
            <span className=" text-heading-m-6 font-medium leading-8 tracking-tight text-center break-words max-w-full">
              {brand.name}
            </span>
          </>
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-sm">{brand.name}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
