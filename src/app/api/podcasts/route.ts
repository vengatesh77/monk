import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET() {
  try {
    await connectToDatabase();
    const podcasts = await Podcast.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: podcasts });
  } catch (error) {
    console.error("GET /api/podcasts error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (!body.title || !body.slug || !body.description || !body.thumbnail) {
      return NextResponse.json(
        { success: false, message: "Title, slug, description, and thumbnail are required" },
        { status: 400 }
      );
    }

    const podcast = await Podcast.create(body);
    return NextResponse.json(
      { success: true, message: "Podcast created successfully", data: podcast },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/podcasts error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create podcast" },
      { status: 500 }
    );
  }
}
