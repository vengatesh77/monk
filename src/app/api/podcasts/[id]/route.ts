import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const podcast = await Podcast.findById(id);

    if (!podcast) {
      return NextResponse.json(
        { success: false, message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: podcast });
  } catch (error) {
    console.error("GET /api/podcasts/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch podcast" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();

    const updatedPodcast = await Podcast.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPodcast) {
      return NextResponse.json(
        { success: false, message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Podcast updated successfully",
      data: updatedPodcast,
    });
  } catch (error: any) {
    console.error("PUT /api/podcasts/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update podcast" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedPodcast = await Podcast.findByIdAndDelete(id);

    if (!deletedPodcast) {
      return NextResponse.json(
        { success: false, message: "Podcast not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/podcasts/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete podcast" },
      { status: 500 }
    );
  }
}
