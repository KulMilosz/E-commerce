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
      throw new Error(err.error || "Błąd dodawania do koszyka");
    }

    const result = await res.json();
    
    showNotification({
      type: "success",
      message: "Produkt został dodany do koszyka!",
      duration: 3000,
    });

    return result;
  } catch (error) {
    showNotification({
      type: "error",
      message: "Błąd podczas dodawania do koszyka",
      duration: 4000,
    });
    throw error;
  }
}
