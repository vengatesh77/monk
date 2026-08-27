import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (!body.title || !body.slug || !body.description || !body.category || !body.thumbnail) {
      return NextResponse.json(
        { success: false, message: "Title, slug, description, category, and thumbnail are required" },
        { status: 400 }
      );
    }

    const item = await Portfolio.create(body);
    return NextResponse.json(
      { success: true, message: "Portfolio item created successfully", data: item },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create portfolio item" },
      { status: 500 }
    );
  }
}
