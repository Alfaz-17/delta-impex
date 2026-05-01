import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Division from "@/lib/models/Division";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";
import { STATIC_CATEGORIES } from "@/lib/categories";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const stats = { 
      divisionsFixed: 0, 
      productCategoriesMigrated: 0,
      errors: [] as string[]
    };

    // 1. Ensure core divisions exist with correct slugs
    const marineDiv = await Division.findOneAndUpdate(
      { slug: "marine-industrial" },
      { name: "Marine & Industrial" },
      { upsert: true, new: true }
    );

    const roDiv = await Division.findOneAndUpdate(
      { slug: "ro-solutions" },
      { name: "RO Solutions" },
      { upsert: true, new: true }
    );

    // 2. Migrate Products where category is still an ObjectId
    const products = await Product.find({}).lean();
    
    for (const prod of products) {
      let needsUpdate = false;
      const updateData: any = {};

      // If category looks like an ObjectId, try to resolve it to a slug
      if (mongoose.Types.ObjectId.isValid(prod.category as string)) {
        const oldCat = await Category.findById(prod.category);
        if (oldCat) {
          // Try to find a matching static category slug by name or fuzzy match
          const staticMatch = STATIC_CATEGORIES.find(
            sc => sc.name.toLowerCase() === oldCat.name.toLowerCase() || 
                  oldCat.name.toLowerCase().includes(sc.name.toLowerCase())
          );
          
          if (staticMatch) {
            updateData.category = staticMatch.slug;
            needsUpdate = true;
          } else {
            // Default to first category in division if no match
            const div = await Division.findById(oldCat.division);
            const divSlug = div?.slug || "marine-industrial";
            const fallback = STATIC_CATEGORIES.find(sc => sc.division === divSlug);
            updateData.category = fallback?.slug || "main-engine";
            needsUpdate = true;
          }
        }
      }

      if (needsUpdate) {
        await Product.findByIdAndUpdate(prod._id, updateData);
        stats.productCategoriesMigrated++;
      }
    }

    return NextResponse.json({
      message: "Data migration and sync completed",
      stats
    });
  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
