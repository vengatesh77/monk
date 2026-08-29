import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// POST /api/login — User login without email verification checks
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const inputData = {
      email: (body.email || body.username || "").toString().trim(),
      password: (body.password || "").toString(),
    };

    const parsed = loginSchema.safeParse(inputData);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0].message || "Validation failed",
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectDB();

    // 1. Validate account existence
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // Direct login success — NO check for emailVerified or verificationToken
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Login failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
