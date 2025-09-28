import { Suspense } from "react";
import { getCategories } from "../lib/categories";
import { getProducts } from "../services/productsService";
import ProductsSidebar from "../components/products/ProductsSidebar";
import ProductsGrid from "../components/products/ProductsGrid";
import Pagination from "../components/products/Pagination";
import { SearchParams } from "../types";

export default async function ProductsPage(props: {
  searchParams: SearchParams | Promise<SearchParams>;
}) {
  const sp = await props.searchParams;

  const category = (sp.category as string) || undefined;
  const minPrice = (sp.minPrice as string) || undefined;
  const maxPrice = (sp.maxPrice as string) || undefined;
  const sortBy = (sp.sortBy as string) || "latest";
  const show = (sp.show as string) || "9";

  const parsedPage = Number.parseInt((sp.page as string) ?? "", 10);
  const page = Number.isNaN(parsedPage) ? 1 : parsedPage;

  const [categories, { products, pagination }] = await Promise.all([
    getCategories(),
    getProducts({ category, minPrice, maxPrice, sortBy, show, page }),
  ]);

  const urlParams = new URLSearchParams(sp as Record<string, string>);
  urlParams.delete("page");
  const baseUrl = `/products?${urlParams.toString()}`;

  return (
    <div className=" bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-8 py-8">
        <div className="border-t border-[#383B42] -mx-8 mb-10"></div>
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductsSidebar
                categories={categories}
                currentCategory={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </Suspense>
          </aside>

          <div className="border-l border-[#383B42] -mt-10"></div>

          <main className="flex-1">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductsGrid products={products} />
            </Suspense>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              baseUrl={baseUrl}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
