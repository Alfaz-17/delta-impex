import { Metadata } from 'next'
import HomeContent from './home-content'
import { SITE_INFO } from '@/lib/site'
import { client } from '@/sanity/lib/client'
import connectToDatabase from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import Division from '@/lib/models/Division'
import { STATIC_CATEGORIES } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Delta Impex | Marine Engine Spares & RO Water Treatment Plants',
  description: 'Delta Impex is a global leader in supplying high-quality marine engine spare parts, industrial machinery, and advanced RO water treatment solutions.',
  alternates: {
    canonical: SITE_INFO.domain,
  },
  openGraph: {
    title: 'Delta Impex | Marine Spares & RO Water Systems',
    description: 'Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.',
    url: SITE_INFO.domain,
  }
}

export const revalidate = 3600;

async function getHomePageData() {
  const query = `{
    "home": *[_type == "homePage"][0] {
      ...,
      "heroImageUrl": heroImage.asset->url,
      "aboutImageUrl": aboutImage.asset->url,
      "brands": brands[] {
        name,
        "logoUrl": logo.asset->url
      }
    },
    "footer": *[_type == "footer"][0]
  }`
  return await client.fetch(query)
}

export default async function Home() {
  await connectToDatabase();
  const data = await getHomePageData()

  // Fetch featured products for both divisions on the server
  const getFeaturedForDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    if (!division) return [];
    
    const productsRaw = await Product.find({ 
      division: division._id,
      isFeatured: true 
    })
    .limit(12)
    .lean();

    return productsRaw.map((p: any) => {
      const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
      return {
        ...p,
        _id: p._id.toString(),
        division: { _id: p.division.toString(), name: division.name, slug: division.slug },
        category: cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category },
      };
    });
  };

  const [marineProducts, roProducts] = await Promise.all([
    getFeaturedForDivision("marine-industrial"),
    getFeaturedForDivision("ro-solutions")
  ]);
  
  return (
    <HomeContent 
      initialData={data.home} 
      footerData={data.footer}
      marineProducts={marineProducts}
      roProducts={roProducts}
    />
  )
}
