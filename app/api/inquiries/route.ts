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

    // --- Direct Email Sending via Resend ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Delta Impex <inquiry@deltaimpex.co>",
            to: "sales@deltaimpex.co",
            subject: `New Technical Inquiry: ${data.name}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <div style="background-color: #1B3A5C; color: white; padding: 15px; border-radius: 4px 4px 0 0;">
                  <h2 style="margin: 0; font-size: 18px;">Delta Impex • New Technical Inquiry</h2>
                </div>
                <div style="padding: 20px; border: 1px solid #eee; border-top: none;">
                  <p><strong>Inquiry Type:</strong> ${data.type ? data.type.toUpperCase() : "GENERAL"}</p>
                  <p><strong>Client Name:</strong> ${data.name}</p>
                  <p><strong>Client Email:</strong> ${data.email}</p>
                  <p><strong>Company/Vessel:</strong> ${data.company || "Not Specified"}</p>
                  ${data.searchQuery ? `<p><strong>Search Context:</strong> User was searching for <em>"${data.searchQuery}"</em></p>` : ""}
                  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                  <p><strong>Technical Message:</strong></p>
                  <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1B3A5C; font-style: italic;">
                    ${data.message}
                  </div>
                </div>
                <p style="font-size: 10px; color: #999; margin-top: 20px;">
                  This is an automated notification from your website's Communication Hub.
                </p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email Delivery Error:", emailError);
        // We don't fail the whole request if email fails, as it's already in the DB
      }
    }

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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await connectToDatabase();
    await Inquiry.findByIdAndDelete(id);

    return NextResponse.json({ message: "Inquiry deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
