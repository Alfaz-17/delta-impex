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
  
  // 1. Try to find user by session email
  let user = await User.findOne({ email: session.user?.email });

  // 2. Fallback: if not found, load the primary admin user from the database
  if (!user) {
    user = await User.findOne();
  }

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

    // 1. Find user by session email
    let user = await User.findOne({ email: session.user?.email });

    // 2. If not found by session email, check if there's an existing user with the requested email
    if (!user && email) {
      user = await User.findOne({ email });
    }

    // 3. Prevent duplicate email conflicts with other accounts
    if (email && email !== session.user?.email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken && (!user || emailTaken._id.toString() !== user._id.toString())) {
        return NextResponse.json({ error: "Email is already taken by another account" }, { status: 400 });
      }
    }

    if (password && password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    if (!user) {
      // Create new user in DB if they were using ENV credentials and no match in DB
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
