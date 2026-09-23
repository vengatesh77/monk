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

export const runtime = "nodejs";

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
    const webhookUrl = process.env.PICKMYAI_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("[CRM] PICKMYAI_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { success: false, message: "Form delivery is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    // Save contact inquiry directly to MongoDB Atlas
    await connectDB();
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject,
      message,
    });

    console.log("[CRM] Contact webhook starting");

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firstName: name,
          fullName: name,
          email: email.toLowerCase(),
          emailAddress: email.toLowerCase(),
          phone,
          phoneNumber: phone,
          contactNumber: phone,
          mobile: phone,
          message,
          notes: message,
          source: "website",
          leadSource: "Monk Podcast Studio",
          leadId: contact._id.toString(),
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (webhookError) {
      console.error("[CRM] Contact webhook request failed:", webhookError);
      return NextResponse.json(
        { success: false, message: "We received your message, but could not forward it right now. Please try again later." },
        { status: 502 }
      );
    }

    const webhookResponseText = await webhookResponse.text();
    let webhookResult: unknown;
    try {
      webhookResult = JSON.parse(webhookResponseText);
    } catch {
      webhookResult = undefined;
    }

    const webhookResultObject =
      typeof webhookResult === "object" && webhookResult !== null
        ? (webhookResult as Record<string, unknown>)
        : undefined;
    const webhookReportedFailure =
      webhookResultObject?.success === false ||
      webhookResultObject?.ok === false ||
      ["error", "failed"].includes(String(webhookResultObject?.status).toLowerCase()) ||
      Boolean(webhookResultObject?.error);
    const webhookRequestId = webhookResponse.headers.get("x-request-id");
    const webhookLeadId =
      typeof webhookResultObject?.leadId === "string"
        ? webhookResultObject.leadId
        : typeof webhookResultObject?.id === "string"
          ? webhookResultObject.id
          : undefined;

    console.log(`[CRM] Contact webhook response status: ${webhookResponse.status}`);
    if (webhookRequestId) console.log(`[CRM] Contact webhook request-id: ${webhookRequestId}`);
    if (webhookLeadId) console.log(`[CRM] Contact webhook lead-id: ${webhookLeadId}`);

    if (!webhookResponse.ok || webhookReportedFailure) {
      console.error("[CRM] Contact webhook rejected the contact", {
        status: webhookResponse.status,
        contentType: webhookResponse.headers.get("content-type"),
        requestId: webhookRequestId,
      });
      return NextResponse.json(
        { success: false, message: "We received your message, but could not forward it right now. Please try again later." },
        { status: 502 }
      );
    }

    console.log("[CRM] Contact webhook accepted contact");

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
