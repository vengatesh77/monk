import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    // Allow lookup by ID or slug
    let item = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Portfolio.findById(id);
    }
    if (!item) {
      item = await Portfolio.findOne({ slug: id });
    }

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Portfolio item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("GET /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio item" },
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

    const updatedItem = await Portfolio.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Portfolio item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio item updated successfully",
      data: updatedItem,
    });
  } catch (error: any) {
    console.error("PUT /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update portfolio item" },
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
    const deletedItem = await Portfolio.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Portfolio item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio item deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/portfolio/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete portfolio item" },
      { status: 500 }
    );
  }
}
