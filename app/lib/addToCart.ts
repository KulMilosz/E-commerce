import { showNotification } from "@/app/components/providers/NotificationProvider";

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error adding to cart");
    }

    const result = await res.json();
    
    showNotification({
      type: "success",
      title: "Success",
      message: "Product has been added to cart!",
      duration: 3000,
    });

    return result;
  } catch (error) {
    showNotification({
      type: "error",
      title: "Error",
      message: "Error occurred while adding to cart",
      duration: 4000,
    });
    throw error;
  }
}
