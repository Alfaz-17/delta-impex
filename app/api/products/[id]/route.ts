import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Division from "@/lib/models/Division";
import mongoose from "mongoose";

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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.findById(id).populate("division category");
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();
    
    const data = await req.json();

    if (data.division && !mongoose.Types.ObjectId.isValid(data.division)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    if (data.category && !mongoose.Types.ObjectId.isValid(data.category)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    const existingProduct = await Product.findById(id).select("_id division category slug");
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const nextDivisionId = data.division || String(existingProduct.division);
    const nextCategoryId = data.category || String(existingProduct.category);

    if (
      !mongoose.Types.ObjectId.isValid(nextDivisionId) ||
      !mongoose.Types.ObjectId.isValid(nextCategoryId)
    ) {
      return NextResponse.json({ error: "Invalid division or category ID" }, { status: 400 });
    }

    const [division, category] = await Promise.all([
      Division.findById(nextDivisionId).select("_id"),
      Category.findById(nextCategoryId).select("_id division"),
    ]);

    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    if (String(category.division) !== String(nextDivisionId)) {
      return NextResponse.json({ error: "Category does not belong to the selected division" }, { status: 400 });
    }

    if (data.name || data.slug) {
      data.slug = await ensureUniqueProductSlug(slugify(data.slug || data.name), id);
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true }).populate("division category");
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "A product with that slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
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
