import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    // If user is logged in via ENV but not in DB yet
    return NextResponse.json({
      email: session.user?.email,
      name: session.user?.name,
      isDefault: true
    });
  }

  return NextResponse.json({
    email: user.email,
    name: user.name,
    isDefault: false
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, password, name } = await req.json();
    await connectToDatabase();

    // Find the current user or create if they were logged in via ENV
    let user = await User.findOne({ email: session.user?.email });

    if (password && password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    if (!user) {
      // Create new user in DB if they were using ENV credentials
      user = await User.create({
        email: email || session.user?.email,
        password: hashedPassword || await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
        name: name || "Admin"
      });
    } else {
      // Update existing user
      if (email) user.email = email;
      if (name) user.name = name;
      if (hashedPassword) user.password = hashedPassword;
      await user.save();
    }

    return NextResponse.json({ message: "Credentials updated successfully" });
  } catch (error: any) {
    console.error("Error updating credentials:", error);
    return NextResponse.json({ error: error.message || "Failed to update credentials" }, { status: 500 });
  }
}
