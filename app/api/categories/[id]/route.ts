import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Division from "@/lib/models/Division";
import Product from "@/lib/models/Product";
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

async function ensureUniqueCategorySlug(baseSlug: string, excludeId: string) {
  const rootSlug = baseSlug || `category-${Date.now()}`;
  let slug = rootSlug;
  let suffix = 1;

  while (true) {
    const existing = await Category.findOne({
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();
    const category = await Category.findById(id).populate("division");

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
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
    const existingCategory = await Category.findById(id).select("_id division slug");

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const nextDivisionId = data.division || String(existingCategory.division);
    if (!mongoose.Types.ObjectId.isValid(nextDivisionId)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    const division = await Division.findById(nextDivisionId).select("_id");
    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    if (data.name || data.slug) {
      data.slug = await ensureUniqueCategorySlug(slugify(data.slug || data.name), id);
    }

    const category = await Category.findByIdAndUpdate(id, data, { new: true }).populate("division");

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "A category with that slug already exists" }, { status: 409 });
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

    const linkedProducts = await Product.countDocuments({ category: id });
    if (linkedProducts > 0) {
      return NextResponse.json(
        { error: "Cannot delete a category that still has products assigned" },
        { status: 409 }
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
