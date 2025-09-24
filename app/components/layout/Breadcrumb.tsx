"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbProps {
  productName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ productName }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const displayParts = pathParts;

  return (
    <nav className="text-text-m font-medium mb-4" aria-label="breadcrumb">
      <ol className="flex items-center">
        <li className="flex items-center">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>
        </li>

        {displayParts.map((part, idx) => {
          const href = "/" + pathParts.slice(0, idx + 1).join("/");
          const isLast = idx === displayParts.length - 1;

          const label =
            isLast && productName
              ? productName.charAt(0).toUpperCase() + productName.slice(1)
              : part.charAt(0).toUpperCase() + part.slice(1);

          return (
            <li key={href} className="flex items-center">
              <Image
                src="/chevron-small-right.svg"
                alt=">"
                width={24}
                height={24}
                className="mx-2"
              />
              {isLast && productName ? (
                <span style={{ color: "#F29145" }} aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-orange-400">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
