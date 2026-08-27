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

    await connectDB();
    const booking = await Booking.create({
      ...parsed.data,
      preferredDate: new Date(parsed.data.preferredDate),
    });

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
