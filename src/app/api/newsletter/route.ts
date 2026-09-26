import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  name: z.string().trim().max(100).optional().default(""),
  phone: z.string().trim().max(25).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
});

// POST /api/newsletter — Subscribe to newsletter
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const rawEmail = (body.email || "").toString().trim().toLowerCase();
    const parsed = newsletterSchema.safeParse({
      email: rawEmail,
      name: (body.name || "").toString().trim(),
      phone: (body.contactNumber || body.phone || "").toString().trim(),
      notes: (body.notes || body.message || "").toString().trim(),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid email address",
        },
        { status: 400 }
      );
    }

    const { email, name, phone, notes } = parsed.data;
    const webhookUrl = process.env.PICKMYAI_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("[CRM] PICKMYAI_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { success: false, message: "Subscription delivery is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    await connectDB();

    // Check for duplicate subscriber in newsletterSubscribers collection
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed.",
        },
        { status: 409 }
      );
    }

    // Save to newsletterSubscribers collection
    const newSubscriber = await NewsletterSubscriber.create({
      email,
      name,
      phone,
      notes,
      status: "active",
      subscribedAt: new Date(),
    });

    console.log("[CRM] Newsletter webhook starting");

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Newsletter subscriber",
          firstName: name || "Newsletter subscriber",
          fullName: name || "Newsletter subscriber",
          email,
          emailAddress: email,
          phone,
          phoneNumber: phone,
          contactNumber: phone,
          mobile: phone,
          message:
            notes ||
            `Newsletter signup from ${name || "website visitor"}`,
          notes:
            notes ||
            `Newsletter signup from ${name || "website visitor"}`,
          source: "website",
          leadSource: "Monk Podcast Studio",
          leadId: newSubscriber._id.toString(),
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (webhookError) {
      console.error("[CRM] Newsletter webhook request failed:", webhookError);
      return NextResponse.json(
        { success: false, message: "Your subscription was saved, but could not be forwarded to our CRM." },
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

    console.log(`[CRM] Newsletter webhook response status: ${webhookResponse.status}`);
    if (webhookRequestId) console.log(`[CRM] Newsletter webhook request-id: ${webhookRequestId}`);
    if (webhookLeadId) console.log(`[CRM] Newsletter webhook lead-id: ${webhookLeadId}`);

    if (!webhookResponse.ok || webhookReportedFailure) {
      console.error("[CRM] Newsletter webhook rejected the signup", {
        status: webhookResponse.status,
        contentType: webhookResponse.headers.get("content-type"),
        requestId: webhookRequestId,
      });
      return NextResponse.json(
        { success: false, message: "Your subscription was saved, but could not be forwarded to our CRM." },
        { status: 502 }
      );
    }

    console.log("[CRM] Newsletter webhook accepted signup");

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter.",
        data: {
          id: newSubscriber._id,
          email: newSubscriber.email,
          status: newSubscriber.status,
          subscribedAt: newSubscriber.subscribedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process subscription. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET /api/newsletter — Admin: retrieve all subscribers
export async function GET(req: NextRequest) {
  try {
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
    const subscribers = await NewsletterSubscriber.find({})
      .sort({ subscribedAt: -1 })
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
