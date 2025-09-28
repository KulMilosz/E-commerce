export async function getCategories() {
  // Automatyczne wykrywanie URL w produkcji
  const baseUrl = process.env.NEXTAUTH_URL || 
                 process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                 'http://localhost:3000';
                 
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const { categories } = await res.json();
  return categories;
}
