import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export const revalidate = 300; // 5 minutes cache

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get latest 10 products, sorted by creation date
    const products = await Product.find({})
      .populate("division", "name slug")
      .populate("category", "name slug")
      .select("name slug imageUrl isFeatured category division description price condition createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: any) {
    console.error("GET /api/new-arrivals Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
