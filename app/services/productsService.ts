export async function getRandomProducts(limit: number = 6) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/random?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch random products");
  }

  const { products } = await res.json();
  return products;
}
