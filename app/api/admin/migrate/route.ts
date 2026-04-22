import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Division from "@/lib/models/Division";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // 1. Ensure Target Divisions Exist
    let marineDiv = await Division.findOne({ slug: "marine-industrial" });
    if (!marineDiv) {
      marineDiv = await Division.create({ name: "Marine & Industrial", slug: "marine-industrial" });
    }

    let roDiv = await Division.findOne({ slug: "ro-solutions" });
    if (!roDiv) {
      roDiv = await Division.create({ name: "RO Solutions", slug: "ro-solutions" });
    }

    // 2. Map Old Slugs to New IDs
    const marineSlugs = ["marine-propulsion", "engineering-spares", "power-systems"];
    const roSlugs = ["industrial-filtration", "ro-systems"];

    const oldDivs = await Division.find({ 
      slug: { $in: [...marineSlugs, ...roSlugs] } 
    });

    const stats = { categories: 0, products: 0, deleted: 0 };

    for (const oldDiv of oldDivs) {
      const targetId = marineSlugs.includes(oldDiv.slug) ? marineDiv._id : roDiv._id;

      // Update Categories
      const catResult = await Category.updateMany(
        { division: oldDiv._id },
        { division: targetId }
      );
      stats.categories += catResult.modifiedCount;

      // Update Products
      const prodResult = await Product.updateMany(
        { division: oldDiv._id },
        { division: targetId }
      );
      stats.products += prodResult.modifiedCount;

      // Delete Old Division
      await Division.findByIdAndDelete(oldDiv._id);
      stats.deleted++;
    }

    return NextResponse.json({
      message: "Migration completed successfully",
      stats
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
