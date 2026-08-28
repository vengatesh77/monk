import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";
import { z } from "zod";

const newsletterSchema = z.object({
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

// POST /api/newsletter — Subscribe
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: parsed.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for duplicate
    const existing = await Newsletter.findOne({ email: parsed.data.email });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed.",
        },
        { status: 409 }
      );
    }

    await Newsletter.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! Stay tuned for updates.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// GET /api/newsletter — Admin: retrieve all subscribers
export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    const expectedKey = (process.env.ADMIN_PASSWORD || "Monk@1234").trim();
    if (!adminKey || adminKey.trim() !== expectedKey) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const subscribers = await Newsletter.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Subscribers retrieved",
        data: subscribers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
