import { NextRequest, NextResponse } from "next/server";
import { analyzeProductImage } from "@/lib/gemini";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";
import { STATIC_CATEGORIES } from "@/lib/categories";
import Division from "@/lib/models/Division";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const divisionId = formData.get("divisionId") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;

    await connectToDatabase();
    
    // Fetch categories for this division to help AI pick the right one
    let categories: string[] = [];
    if (divisionId && mongoose.Types.ObjectId.isValid(divisionId)) {
      const division = await Division.findById(divisionId).select("slug");
      if (division) {
        categories = STATIC_CATEGORIES.filter(c => c.division === division.slug).map(c => c.name);
      }
    } else {
      categories = STATIC_CATEGORIES.map(c => c.name);
    }

    const analysis = await analyzeProductImage(buffer, mimeType, categories);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("AI Analysis API error:", error);
    return NextResponse.json(
      { error: error.message || "AI Analysis failed" },
      { status: 500 }
    );
  }
}
