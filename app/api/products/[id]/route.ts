import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();
    
    const data = await req.json();
    
    // Recalculate slug if name changed
    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
