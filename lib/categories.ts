// Static categories — single source of truth for the entire website.
// No database dependency. Used in admin product form, public pages, and hero section.

export type StaticCategory = {
  name: string;
  slug: string;
  imageUrl: string;
  division: string; // "marine-industrial" or "ro-solutions"
  divisionName: string;
};

export const STATIC_CATEGORIES: StaticCategory[] = [
  {
    name: "Main Engine",
    slug: "main-engine",
    imageUrl: "/category-assets/main-engine-1.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "Generators",
    slug: "generators",
    imageUrl: "/category-assets/generators-2.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "Spare Parts",
    slug: "spare-parts",
    imageUrl: "/category-assets/spare-parts-3.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "Industrial Parts",
    slug: "industrial-parts",
    imageUrl: "/category-assets/industrial-parts-4.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "Crank Shaft",
    slug: "crank-shaft",
    imageUrl: "/category-assets/crank-shaft-5.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "Alternators",
    slug: "alternators",
    imageUrl: "/category-assets/alternators-6.png",
    division: "marine-industrial",
    divisionName: "Marine & Industrial",
  },
  {
    name: "RO Water Plant",
    slug: "ro-water-plant",
    imageUrl: "/category-assets/ro-system-8.png",
    division: "ro-solutions",
    divisionName: "RO Solutions",
  },
];

// Helper: get categories filtered by division slug
export function getCategoriesByDivision(divisionSlug: string) {
  return STATIC_CATEGORIES.filter((c) => c.division === divisionSlug);
}

// Helper: find a category by slug
export function getCategoryBySlug(slug: string) {
  return STATIC_CATEGORIES.find((c) => c.slug === slug);
}

// Helper: get all category names (for AI analysis)
export function getCategoryNames() {
  return STATIC_CATEGORIES.map((c) => c.name);
}
