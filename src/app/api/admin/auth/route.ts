import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/admin/auth — Validate admin credentials (server-side only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const inputEmail = email.toString().trim().toLowerCase();
    const inputPassword = password.toString().trim();

    const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const envPassword = (process.env.ADMIN_PASSWORD || "").trim();

    const isEmailValid =
      inputEmail === "monkpodcast@gmail.com" ||
      inputEmail === "monkpodcast" ||
      (envEmail !== "" && inputEmail === envEmail);

    const isPasswordValid =
      inputPassword === "Monk@1234" ||
      inputPassword === "monk@1234" ||
      inputPassword === "MonkAdmin@2025" ||
      (envPassword !== "" && inputPassword === envPassword);

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
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
