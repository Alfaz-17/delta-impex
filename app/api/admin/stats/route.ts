import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { STATIC_CATEGORIES } from "@/lib/categories";
import Division from "@/lib/models/Division";


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const divisionId = searchParams.get("divisionId");

    let query: any = {};
    let staticCatCount = STATIC_CATEGORIES.length;

    if (divisionId && mongoose.Types.ObjectId.isValid(divisionId)) {
        query.division = divisionId;
        const division = await Division.findById(divisionId).select("slug");
        if (division) {
          staticCatCount = STATIC_CATEGORIES.filter(c => c.division === division.slug).length;
        }
    }

    const [productCount, featuredCount] = await Promise.all([
      Product.countDocuments(query),
      Product.countDocuments({ ...query, isFeatured: true }),
    ]);

    return NextResponse.json({
      productCount,
      categoryCount: staticCatCount,
      featuredCount,
    });
  } catch (error: any) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
