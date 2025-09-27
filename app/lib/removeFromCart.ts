export async function removeFromCart(cartItemId: string) {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error removing from cart");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function clearCart() {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error clearing cart");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
