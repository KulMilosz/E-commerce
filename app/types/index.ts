import { Product, Category } from "../generated/prisma";
import { ReactNode } from "react";

export interface ProductWithNumericPrice {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: { name: string };
  brand: { name: string; logoUrl: string };
}

export interface ProductDetails
  extends Omit<Product, "price" | "categoryId" | "brandId"> {
  price: number;
  category: { name: string };
  brand: { name: string; logoUrl: string };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  show?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
}

export interface ProductsResponse {
  products: ProductWithNumericPrice[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductsSidebarProps {
  categories: Category[];
  currentCategory?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface ProductsHeaderProps {
  totalProducts: number;
  sortBy: string;
  show: string;
}

export interface ProductsGridProps {
  products: ProductWithNumericPrice[];
}

export interface ProductDetailsProps {
  product: ProductDetails;
}

export interface RelatedProductsProps {
  products: ProductWithNumericPrice[];
}

export interface CartItem {
  id: string;
  product: ProductWithNumericPrice;
  quantity: number;
}

export interface CategoryCarouselProps {
  categories: (Category & { productCount: number })[];
}

export interface RecommendationsProps {
  products: ProductWithNumericPrice[];
}
export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface BrandsProps {
  brands: Brand[];
}

export interface BrandCardProps {
  brand: Brand;
}

export interface ProductCardProps {
  product: ProductWithNumericPrice;
}

export interface CardProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface HorizontalSliderProps {
  children: ReactNode;
  title: string;
  seeAllText?: string;
  className?: string;
}

export interface CategoryGridProps {
  categories: (Category & { productCount: number })[];
}

export interface ProductDetailInfo {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface QuantitySelectorProps {
  price: number;
  stock: number;
  onChange?: (quantity: number, total: number) => void;
}
