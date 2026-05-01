import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import mongoose from "mongoose";
import { STATIC_CATEGORIES } from "@/lib/categories";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function ensureUniqueProductSlug(baseSlug: string, excludeId: string) {
  const rootSlug = baseSlug || `product-${Date.now()}`;
  let slug = rootSlug;
  let suffix = 1;

  while (true) {
    const existing = await Product.findOne({
      slug,
      _id: { $ne: excludeId },
    }).select("_id");

    if (!existing) {
      return slug;
    }

    slug = `${rootSlug}-${suffix++}`;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("GET /api/products/[id] - ID:", id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("GET /api/products/[id] - Invalid ID format:", id);
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.findById(id).populate("division").lean();
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Enrich category with static data
    const p = product as any;
    const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
    p.category = cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category };

    return NextResponse.json(p);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();
    
    const data = await req.json();

    // Validate division if provided
    if (data.division !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(data.division)) {
        return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
      }
      const division = await Division.findById(data.division).select("_id");
      if (!division) {
        return NextResponse.json({ error: "Division not found" }, { status: 404 });
      }
    }

    // Validate category if provided (must be a valid static slug)
    if (data.category !== undefined) {
      const validCategory = STATIC_CATEGORIES.find((c) => c.slug === data.category);
      if (!validCategory) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
    }

    const existingProduct = await Product.findById(id).select("_id slug");
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (data.name || data.slug) {
      data.slug = await ensureUniqueProductSlug(slugify(data.slug || data.name), id);
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true }).populate("division");
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Enrich category with static data
    const p = product.toObject();
    const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
    (p as any).category = cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category };

    return NextResponse.json(p);
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "A product with that slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
