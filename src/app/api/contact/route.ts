import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "First name is required").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(5, "Please enter a valid phone number")
    .max(25, "Phone number too long"),
  subject: z.string().optional().default("General Contact Inquiry"),
  message: z.string().trim().min(1, "Message is required"),
});

// POST /api/contact — Submit a contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both name/firstName and phone/contactNumber keys
    const inputData = {
      name: (body.name || body.firstName || "").toString().trim(),
      email: (body.email || "").toString().trim(),
      phone: (body.phone || body.contactNumber || "").toString().trim(),
      subject: (body.subject || "General Contact Inquiry").toString().trim(),
      message: (body.message || "").toString().trim(),
    };

    const parsed = contactSchema.safeParse(inputData);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0].message || "Validation failed",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    // Save contact inquiry directly to MongoDB Atlas
    await connectDB();
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Monk Podcast Studio. Your message has been received successfully. We will contact you soon.",
        data: { id: contact._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact POST database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET /api/contact — Admin: retrieve all contacts
export async function GET(req: NextRequest) {
  try {
    // Admin auth check via header
    const adminKey = req.headers.get("x-admin-key");
    const envPassword = (process.env.ADMIN_PASSWORD || "").trim();
    const isValidKey =
      adminKey &&
      (adminKey.trim() === "Monk@1234" ||
        adminKey.trim() === "MonkAdmin@2025" ||
        (envPassword !== "" && adminKey.trim() === envPassword));

    if (!isValidKey) {
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
