export async function getCategories() {
  try {
    // Używamy zmiennych środowiskowych
    const baseUrl = process.env.NEXTAUTH_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
    console.log('Fetching categories from:', baseUrl);
                 
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error('Categories fetch failed:', res.status, res.statusText);
      throw new Error("Failed to fetch categories");
    }

    const { categories } = await res.json();
    return categories;
  } catch (error) {
    console.error('Fetch error in getCategories:', error);
    throw error;
  }
}
