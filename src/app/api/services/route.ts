import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectToDatabase();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (!body.title || !body.slug || !body.description || !body.image) {
      return NextResponse.json(
        { success: false, message: "Title, slug, description, and image are required" },
        { status: 400 }
      );
    }

    const service = await Service.create(body);
    return NextResponse.json(
      { success: true, message: "Service created successfully", data: service },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
