import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import Category from "@/lib/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const divisionId = searchParams.get("divisionId");
    const categoryId = searchParams.get("categoryId");
    const isFeatured = searchParams.get("isFeatured");
    const limit = parseInt(searchParams.get("limit") || "0", 10);
    
    let query: any = {};
    if (divisionId) {
      if (!mongoose.Types.ObjectId.isValid(divisionId)) return NextResponse.json([]);
      query.division = divisionId;
    }
    if (categoryId) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) return NextResponse.json([]);
      query.category = categoryId;
    }
    if (isFeatured === "true") query.isFeatured = true;
    
    let dbQuery = Product.find(query)
      .populate("division", "name slug") // Only fetch essential division fields
      .populate("category", "name slug") // Only fetch essential category fields
      .select("name slug imageUrl isFeatured category division") // Project only what's needed for grids
      .sort({ createdAt: -1 });

    if (limit > 0) {
        dbQuery = dbQuery.limit(limit);
    }
      
    const products = await dbQuery;
      
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("GET /api/products Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();
    
    // Simple slugification if not provided
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();
    const { ids } = data;

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
    }

    await Product.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: "Products deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/products Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
