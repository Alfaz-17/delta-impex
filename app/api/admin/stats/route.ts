import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const divisionId = searchParams.get("divisionId");

    let query: any = {};
    if (divisionId && mongoose.Types.ObjectId.isValid(divisionId)) {
        query.division = divisionId;
    }

    const [productCount, categoryCount, featuredCount] = await Promise.all([
      Product.countDocuments(query),
      Category.countDocuments(query),
      Product.countDocuments({ ...query, isFeatured: true }),
    ]);

    return NextResponse.json({
      productCount,
      categoryCount,
      featuredCount,
    });
  } catch (error: any) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
