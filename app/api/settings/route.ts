import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Settings } from "@/lib/models";

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectDB();
    
    let settings = await Settings.findOne();
    if (settings) {
      Object.assign(settings, data);
      await settings.save();
    } else {
      settings = await Settings.create(data);
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
