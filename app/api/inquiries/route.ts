import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const inquiry = await Inquiry.create(data);

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    console.error("Inquiry API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
