import { Suspense } from 'react';
import { getCategories } from '../lib/categories';
import { getProducts } from '../services/productsService';
import ProductsSidebar from '../components/products/ProductsSidebar';
import ProductsGrid from '../components/products/ProductsGrid';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories = await getCategories();
  
  const categoryFilter = searchParams.category as string;
  const minPrice = searchParams.minPrice as string;
  const maxPrice = searchParams.maxPrice as string;
  const sortBy = searchParams.sortBy as string || 'latest';
  const show = searchParams.show as string || '9';

  const { products, pagination } = await getProducts({
    category: categoryFilter,
    minPrice,
    maxPrice,
    sortBy,
    show: show,
    page: 1
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-8 py-8">
        <div className="border-t border-[#383B42] -mx-8 mb-10"></div>
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductsSidebar 
                categories={categories}
                currentCategory={categoryFilter}
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
          </main>
        </div>
      </div>
    </div>
  );
}
