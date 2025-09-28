import { Product, Category } from "../generated/prisma";
import { ReactNode } from "react";
import { z } from "zod";
import { loginSchema, registerSchema, contactSchema } from "../components/login/loginValidation";
import { Decimal } from "@prisma/client/runtime/library";

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  duration?: number;
}

export interface NotificationContextType {
  currentNotification: Notification | null;
  showNotification: (notification: Omit<Notification, "id">) => void;
  hideNotification: () => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

export interface CartResponse {
  id: string;
  cartItems: CartItem[];
}

export interface CheckoutDetailsProps {
  selectedItems: CartItem[];
  itemTotals: Record<string, { qty: number; total: number }>;
  onItemTotalChange: (itemId: string, qty: number, total: number) => void;
  productProtection: boolean;
  onProductProtectionChange: (value: boolean) => void;
}

export interface OrderSummaryProps {
  selectedItems: CartItem[];
  itemTotals: Record<string, { qty: number; total: number }>;
  onPayNow: () => void;
  productProtection: boolean;
}

export interface TotalProps {
  cartItems: CartItem[];
  selected: string[];
  itemTotals: Record<string, { qty: number; total: number }>;
}

export interface BreadcrumbProps {
  productName?: string;
}

export interface ProvidersProps {
  children: ReactNode;
}

export interface ProductDescriptionProps {
  description: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export interface LoginFormProps {
  type: "login" | "register";
}

export type CartWithProducts = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: Array<{
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: Product;
  }>;
};

export type SearchParams = { [key: string]: string | string[] | undefined };

export interface ProductWithNumericPrice {
  id: string;
  name: string;
  price: number;
  stock: number;
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
  quantity?: number;
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
  product: string;
  initialQuantity?: number;
  onChange?: (quantity: number, total: number) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export interface CartButtonProps {
  color?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  mobile: string;
  orders: Order[];
}

// API Order Types (for Prisma queries)
export interface ApiOrderItem {
  id: string;
  priceAtPurchase: number | string | Decimal;
  product: {
    id: string;
    name: string;
    price: number | string | Decimal;
    category: { id: string; name: string };
    brand: { id: string; name: string };
  };
}

export interface ApiOrder {
  id: string;
  totalAmount: number | string | Decimal;
  orderItems: ApiOrderItem[];
}

export interface QuantityData {
  cartItemId: string;
  quantity: number;
}

// Frontend Order Types
export interface Order {
  id: string;
  createdAt: string;
  status: string;
  totalAmount: number | string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number | string;
  product: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export interface OrderSuccessOrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: {
      name: string;
    };
    brand: {
      name: string;
      logoUrl: string;
    };
  };
}

export interface OrderSuccessOrder {
  id: string;
  userId: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  orderItems: OrderSuccessOrderItem[];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  route?: string;
  label: string;
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
