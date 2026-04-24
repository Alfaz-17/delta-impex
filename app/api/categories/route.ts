import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Division from "@/lib/models/Division";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export const revalidate = 60;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function ensureUniqueCategorySlug(baseSlug: string, excludeId?: string) {
  const rootSlug = baseSlug || `category-${Date.now()}`;
  let slug = rootSlug;
  let suffix = 1;

  while (true) {
    const existing = await Category.findOne({
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
    
    let query = {};
    if (divisionId) {
      if (!mongoose.Types.ObjectId.isValid(divisionId)) {
        return NextResponse.json([]); // Return safe empty array to prevent 500
      }
      query = { division: divisionId };
    }
    
    const categories = await Category.find(query).populate("division");
    return NextResponse.json(categories);
  } catch (error: any) {
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

    if (!data?.name || !data?.division) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(data.division)) {
      return NextResponse.json({ error: "Invalid division ID" }, { status: 400 });
    }

    const division = await Division.findById(data.division).select("_id");
    if (!division) {
      return NextResponse.json({ error: "Division not found" }, { status: 404 });
    }

    data.slug = await ensureUniqueCategorySlug(slugify(data.slug || data.name));
    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "A category with that slug already exists" }, { status: 409 });
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
      return NextResponse.json({ error: "Invalid category IDs" }, { status: 400 });
    }

    if (ids.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return NextResponse.json({ error: "One or more category IDs are invalid" }, { status: 400 });
    }

    const linkedProducts = await Product.countDocuments({ category: { $in: ids } });
    if (linkedProducts > 0) {
      return NextResponse.json(
        { error: "Cannot delete categories that still have products assigned" },
        { status: 409 }
      );
    }

    await Category.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: "Categories deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
