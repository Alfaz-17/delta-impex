import { NextRequest, NextResponse } from "next/server";
import { analyzeProductImage } from "@/lib/ai";
import Category from "@/lib/models/Category";
import connectToDatabase from "@/lib/mongodb";

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
    if (divisionId) {
      const dbCategories = await Category.find({ division: divisionId }).select("name");
      categories = dbCategories.map(c => c.name);
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
