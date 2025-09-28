import { ProductDetailInfo } from "@/app/types";

export async function getProduct(
  id: string
): Promise<ProductDetailInfo | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}
