import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { STATIC_CATEGORIES } from "@/lib/categories";

export const revalidate = 120;

const DIVISION_SLUG_ALIASES: Record<string, string[]> = {
  "ro-solutions": ["ro-solutions"],
  "marine-industrial": ["marine-industrial"],
};

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
    const divisionSlug = searchParams.get("divisionSlug");
    const categorySlug = searchParams.get("category");
    const isFeatured = searchParams.get("isFeatured");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;
    
    let query: any = {};
    if (divisionId) {
      if (!mongoose.Types.ObjectId.isValid(divisionId)) return NextResponse.json({ products: [], total: 0 });
      query.division = divisionId;
    } else if (divisionSlug) {
      const slugCandidates = DIVISION_SLUG_ALIASES[divisionSlug] || [divisionSlug];
      const divisionIds = await Division.find({ slug: { $in: slugCandidates } }).distinct("_id");
      if (!divisionIds?.length) return NextResponse.json({ products: [], total: 0 });
      query.division = { $in: divisionIds };
    }
    if (categorySlug) {
      query.category = categorySlug;
    }
    if (isFeatured === "true") query.isFeatured = true;
    
    const total = await Product.countDocuments(query);
    
    const products = await Product.find(query)
      .populate("division", "name slug")
      .select("name slug imageUrl isFeatured category division description price condition")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Enrich category field with static data for display
    const enriched = products.map((p: any) => {
      const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
      return {
        ...p,
        category: cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category },
      };
    });
      
    return NextResponse.json({
      products: enriched,
      total,
      page,
      limit
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    });
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

    if (!mongoose.Types.ObjectId.isValid(data.division)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    // Validate category is a valid static slug
    const validCategory = STATIC_CATEGORIES.find((c) => c.slug === data.category);
    if (!validCategory) {
      return NextResponse.json({ error: "Invalid category. Please select a valid category." }, { status: 400 });
    }

    const division = await Division.findById(data.division).select("_id");
    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
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
