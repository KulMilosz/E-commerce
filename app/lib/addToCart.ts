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

    return await res.json();
  } catch (error) {
    throw error;
  }
}
