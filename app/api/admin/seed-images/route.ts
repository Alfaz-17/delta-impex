import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // 1. Update Divisions
    await Division.updateOne({ slug: "marine-industrial" }, { imageUrl: "/images/seeding/div-marine.png" });
    await Division.updateOne({ slug: "ro-solutions" }, { imageUrl: "/images/seeding/div-ro.png" });

    // 2. Update Categories
    const catMap = [
      { name: "Inboard Engines", img: "/images/seeding/cat-inboard.png" },
      { name: "Turbochargers", img: "/images/seeding/cat-turbo.png" },
      { name: "Marine Gensets", img: "/images/seeding/cat-gensets.png" },
      { name: "Fuel Water Separators", img: "/images/seeding/cat-filtration.png" },
      { name: "Oil Filtration", img: "/images/seeding/cat-filtration.png" },
      { name: "Gasket Kits", img: "/images/seeding/cat-gaskets.png" },
      { name: "Outboard Motors", img: "/images/seeding/cat-inboard.png" }, // Reusing for now
      { name: "Industrial Generators", img: "/images/seeding/cat-gensets.png" }, // Reusing for now
    ];

    for (const item of catMap) {
      await Category.updateOne({ name: item.name }, { imageUrl: item.img });
    }

    // 3. Update Featured Products
    const prodMap = [
      { slug: "cat-3512c-marine", img: "/images/seeding/prod-cat-3512.png" },
      { slug: "cummins-qsk60-m", img: "/images/seeding/prod-cummins-qsk60.png" },
      { slug: "kohler-80efozdj", img: "/images/seeding/prod-kohler.png" },
      { slug: "borgwarner-s400", img: "/images/seeding/cat-turbo.png" },
      { slug: "racor-dual-751000fh", img: "/images/seeding/cat-filtration.png" },
    ];

    for (const item of prodMap) {
      await Product.updateOne({ slug: item.slug }, { imageUrl: item.img });
    }

    return NextResponse.json({ message: "Seeding completed successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
