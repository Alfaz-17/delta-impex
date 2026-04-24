import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import Category from "@/lib/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function ensureUniqueProductSlug(baseSlug: string, excludeId?: string) {
  const rootSlug = baseSlug || `product-${Date.now()}`;
  let slug = rootSlug;
  let suffix = 1;

  while (true) {
    const existing = await Product.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select("_id");

    if (!existing) {
      return slug;
    }

    slug = `${rootSlug}-${suffix++}`;
  }
}

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
      .select("name slug imageUrl isFeatured category division description price condition") // Project only what's needed for grids
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

    if (!data?.name || !data?.division || !data?.category || !data?.imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (
      !mongoose.Types.ObjectId.isValid(data.division) ||
      !mongoose.Types.ObjectId.isValid(data.category)
    ) {
      return NextResponse.json({ error: "Invalid division or category ID" }, { status: 400 });
    }

    const [division, category] = await Promise.all([
      Division.findById(data.division).select("_id"),
      Category.findById(data.category).select("_id division"),
    ]);

    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    if (String(category.division) !== String(data.division)) {
      return NextResponse.json({ error: "Category does not belong to the selected division" }, { status: 400 });
    }

    const baseSlug = slugify(data.slug || data.name);
    data.slug = await ensureUniqueProductSlug(baseSlug);

    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products Error:", error);
    if (error?.code === 11000) {
      return NextResponse.json({ error: "A product with that slug already exists" }, { status: 409 });
    }
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

    if (ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return NextResponse.json({ error: "One or more product IDs are invalid" }, { status: 400 });
    }

    await Product.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: "Products deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/products Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
