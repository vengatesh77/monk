import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(5, "Please enter a valid phone number")
    .max(20, "Phone too long"),
  subject: z.string().optional().default("General Inquiry"),
  message: z.string().optional().default("No message provided"),
});

// POST /api/contact — Submit a contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Sanitize input data
    const inputData = {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message || "No message provided",
    };

    const parsed = contactSchema.safeParse(inputData);

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
    const contact = await Contact.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. We will get back to you soon.",
        data: { id: contact._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit message. Please try again.",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// GET /api/contact — Admin: retrieve all contacts
export async function GET(req: NextRequest) {
  try {
    // Simple admin auth check via header
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, message: "Contacts retrieved", data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
