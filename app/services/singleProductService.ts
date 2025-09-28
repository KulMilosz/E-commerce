import { ProductDetailInfo } from "@/app/types";

export async function getProduct(
  id: string
): Promise<ProductDetailInfo | null> {
  try {
    // Używamy zmiennych środowiskowych
    const baseUrl = process.env.NEXTAUTH_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    const response = await fetch(`${baseUrl}/api/products/${id}`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error in getProduct:', error);
    return null;
  }
}
