"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbProps {
  productName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ productName }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const displayParts = pathParts.slice(0, -1); // usuwamy ostatni element (ID)

  return (
    <nav className="text-text-m font-medium mb-4">
      <ol className="flex items-center">
        <li className="flex items-center">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>
        </li>

        {displayParts.map((part) => {
          const href =
            "/" + pathParts.slice(0, displayParts.indexOf(part) + 1).join("/");

          return (
            <li key={href} className="flex items-center">
              <Image
                src="/chevron-small-right.svg"
                alt=">"
                width={24}
                height={24}
                className="mx-2"
              />
              <Link href={href} className="hover:text-orange-400">
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </Link>
            </li>
          );
        })}

        <li className="flex items-center">
          <Image
            src="/chevron-small-right.svg"
            alt=">"
            width={24}
            height={24}
            className="mx-2"
          />
          <span style={{ color: "#F29145" }}>
            {productName.charAt(0).toUpperCase() + productName.slice(1)}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
