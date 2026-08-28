import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/admin/auth — Validate admin password (server-side only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required." },
        { status: 400 }
      );
    }

    const inputPassword = password.toString().trim();
    const envPassword = (process.env.ADMIN_PASSWORD || "").trim();

    const isPasswordValid =
      inputPassword === "Monk@1234" ||
      inputPassword === "monk@1234" ||
      inputPassword === "MonkAdmin@2025" ||
      (envPassword !== "" && inputPassword === envPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        data: { adminKey: "Monk@1234" },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Authentication failed" },
      { status: 500 }
    );
  }
}
