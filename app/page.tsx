

import CategoryCarousel from "./components/CategoryCarousel";
import { getCategories } from "./lib/categories";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="py-12 px-4">
        <CategoryCarousel categories={categories} />
      </div>
    </div>
  );
}
