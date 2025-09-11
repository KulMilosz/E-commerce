import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-start mt-6 gap-2">
      {pages.map((p) => (
        <Link
          key={p}
          href={`${baseUrl}&page=${p}`}
          className={`px-3 py-1 rounded transition-colors cursor-pointer ${
            p === currentPage ? "bg-orange-500 text-white" : "text-[#B0B0B0]"
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
