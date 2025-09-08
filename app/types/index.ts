import { Product, Category } from '../generated/prisma';

export interface ProductWithNumericPrice {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: { name: string };
}

export interface ProductDetails extends Omit<Product, 'price' | 'categoryId'> {
  price: number;
  category: { name: string };
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

export interface CartContentProps {}
