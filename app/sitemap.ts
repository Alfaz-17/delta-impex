import { MetadataRoute } from 'next'
import connectToDatabase from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.deltaimpex.co'

  // Fetch all products to include in the sitemap
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const products = await Product.find({}, 'slug updatedAt').lean();
    productEntries = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/divisions/marine-industrial`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/divisions/ro-solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...productEntries];
}
