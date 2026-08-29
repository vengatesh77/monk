import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

// DELETE /api/newsletter/[id] — Delete subscriber
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedSubscriber = await NewsletterSubscriber.findByIdAndDelete(id);

    if (!deletedSubscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscriber deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Newsletter DELETE error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to delete subscriber",
      },
      { status: 500 }
    );
  }
}
