import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(5, "Please enter a valid phone number")
    .max(20, "Phone too long"),
  service: z.string().optional().default("Podcast Recording"),
  preferredDate: z.string().optional().default(new Date().toISOString().split("T")[0]),
  preferredTime: z.string().optional().default("Morning"),
  peopleCount: z.number().optional().default(1),
  message: z.string().optional().default(""),
});

// POST /api/booking — Submit a booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const inputData = {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      service: body.service || "Podcast Recording",
      preferredDate: body.preferredDate || new Date().toISOString().split("T")[0],
      preferredTime: body.preferredTime || "Morning",
      peopleCount: Number(body.peopleCount) || 1,
      message: body.message || "",
    };

    const parsed = bookingSchema.safeParse(inputData);

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

    const webhookUrl = process.env.PICKMYAI_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[CRM] PICKMYAI_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { success: false, message: "Booking delivery is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    await connectDB();
    const booking = await Booking.create({
      ...parsed.data,
      preferredDate: new Date(parsed.data.preferredDate),
    });

    console.log("[CRM] Booking webhook starting");

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          firstName: booking.name,
          fullName: booking.name,
          email: booking.email.toLowerCase(),
          emailAddress: booking.email.toLowerCase(),
          phone: booking.phone,
          phoneNumber: booking.phone,
          contactNumber: booking.phone,
          mobile: booking.phone,
          subject: `Booking request - ${booking.service}`,
          message: booking.message || `Booking request for ${booking.service}.`,
          notes: booking.message || `Booking request for ${booking.service}.`,
          service: booking.service,
          preferredDate: booking.preferredDate.toISOString(),
          preferredTime: booking.preferredTime,
          peopleCount: booking.peopleCount,
          source: "website",
          leadSource: "Monk Podcast Studio",
          leadId: booking._id.toString(),
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (webhookError) {
      console.error("[CRM] Booking webhook request failed:", webhookError);
      return NextResponse.json(
        { success: false, message: "Your booking was saved, but could not be forwarded right now. Please contact us directly." },
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

    console.log(`[CRM] Booking webhook response status: ${webhookResponse.status}`);
    if (webhookRequestId) console.log(`[CRM] Booking webhook request-id: ${webhookRequestId}`);
    if (webhookLeadId) console.log(`[CRM] Booking webhook lead-id: ${webhookLeadId}`);

    if (!webhookResponse.ok || webhookReportedFailure) {
      console.error("[CRM] Booking webhook rejected the booking", {
        status: webhookResponse.status,
        contentType: webhookResponse.headers.get("content-type"),
        requestId: webhookRequestId,
      });
      return NextResponse.json(
        { success: false, message: "Your booking was saved, but could not be forwarded right now. Please contact us directly." },
        { status: 502 }
      );
    }

    console.log("[CRM] Booking webhook accepted booking");

    return NextResponse.json(
      {
        success: true,
        message:
          "Your session has been booked! We will confirm your booking shortly.",
        data: { id: booking._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit booking. Please try again.",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// GET /api/booking — Admin: retrieve all bookings
export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, message: "Bookings retrieved", data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
