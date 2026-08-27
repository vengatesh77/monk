import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (!body.name || !body.location || !body.message) {
      return NextResponse.json(
        { success: false, message: "Name, location, and message are required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.create(body);
    return NextResponse.json(
      { success: true, message: "Testimonial created successfully", data: testimonial },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
