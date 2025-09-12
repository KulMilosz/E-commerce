import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import CategoryGrid from "./CategoryGrid";
import Recommendations from "./Recommendations";
import Brands from "./Brands";
import { getCategories } from "../../services/categoriesService";
import { ProductWithNumericPrice } from "../../types";

const MainSection = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [categories, productsResponse, brandsResponse] = await Promise.all([
    getCategories(),
    fetch(`${API_URL}/products/random`, { cache: "no-store" }),
    fetch(`${API_URL}/brands`, { cache: "no-store" }),
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
