import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import CategoryGrid from "./CategoryGrid";
import Recommendations from "./Recommendations";
import Brands from "./Brands";
import { getCategories } from "../../services/categoriesService";
import { PrismaClient, Product } from "../../generated/prisma";

type ProductWithNumericPrice = Omit<Product, 'price'> & {
  price: number;
  category: {
    name: string;
  };
};

const prisma = new PrismaClient();

const MainSection = async () => {
  const [categories, products]: [any, ProductWithNumericPrice[]] = await Promise.all([
    getCategories(),
    prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    }).then(allProducts => {
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 6).map(product => ({
        ...product,
        price: parseFloat(product.price.toString())
      }));
    })
  ]);

  await prisma.$disconnect();

  const brands = [
    { id: "1", name: "Brand 1" },
    { id: "2", name: "Brand 2" },
    { id: "3", name: "Brand 3" },
    { id: "4", name: "Brand 4" },
    { id: "5", name: "Brand 5" },
    { id: "6", name: "Brand 6" },
  ];

  return (
    <div className="space-y-25">
      <CategoryCarousel categories={categories} />
      <CategoryGrid categories={categories} />
      <Recommendations products={products} />
      <div className="mt-25">
        <Brands brands={brands} />
      </div>
    </div>
  );
};

export default MainSection;
