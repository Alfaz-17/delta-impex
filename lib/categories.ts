let categoriesCache: any[] | null = null;

export async function getCategories() {
  if (categoriesCache) return categoriesCache;
  
  try {
    const response = await fetch("/api/categories?includeCounts=true");
    const data = await response.json();
    categoriesCache = data;
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export function getCachedCategories() {
  return categoriesCache;
}
