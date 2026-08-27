import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

function isAdminAuthorized(req: NextRequest): boolean {
  const adminKey = req.headers.get("x-admin-key");
  return adminKey === process.env.ADMIN_PASSWORD;
}

// PATCH /api/booking/[id] — Update booking status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status value",
          error: parsed.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    await connectDB();
    const { id } = await params;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Booking status updated", data: booking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed." },
      { status: 500 }
    );
  }
}

// DELETE /api/booking/[id] — Delete a booking
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed." },
      { status: 500 }
    );
  }
}
