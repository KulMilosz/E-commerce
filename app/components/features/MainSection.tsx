import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import CategoryGrid from "./CategoryGrid";
import Recommendations from "./Recommendations";
import Brands from "./Brands";
import { getCategories } from "../../services/categoriesService";
import { ProductWithNumericPrice } from "../../types";

const MainSection = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const [categories, productsResponse, brandsResponse] = await Promise.all([
    getCategories(),
    fetch(`${baseUrl}/api/products/random`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/brands`, { cache: "no-store" }),
  ]);

  const productsData = await productsResponse.json();
  const products: ProductWithNumericPrice[] = productsData.products || [];

  const brandsData = await brandsResponse.json();
  const brands = brandsData.brands || [];

  return (
    <div className="space-y-25">
      <CategoryCarousel categories={categories} />
      <CategoryGrid categories={categories} />
      <Recommendations products={products} />
      <div className="mt-25 mb-20 ">
        <Brands brands={brands} />
      </div>
    </div>
  );
};

export default MainSection;
