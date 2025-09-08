import { ProductFilters, ProductsResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.show) params.append('show', filters.show);
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);

  const response = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}