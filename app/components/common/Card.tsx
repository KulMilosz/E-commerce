"use client";
import Link from "next/link";
import { CardProps } from "@/app/types";

export default function Card({
  href,
  children,
  className = "",
  onClick,
}: CardProps) {
  const baseClasses =
    "group bg-[#222327] border border-[#383B42] rounded-md overflow-hidden hover:border-[#F29145] transition-colors duration-300 flex-shrink-0 flex flex-col cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
