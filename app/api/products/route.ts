import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const divisionId = searchParams.get("divisionId");
    const categoryId = searchParams.get("categoryId");
    const isFeatured = searchParams.get("isFeatured");
    
    let query: any = {};
    if (divisionId) query.division = divisionId;
    if (categoryId) query.category = categoryId;
    if (isFeatured === "true") query.isFeatured = true;
    
    const products = await Product.find(query)
      .populate("division")
      .populate("category")
      .sort({ createdAt: -1 });
      
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
