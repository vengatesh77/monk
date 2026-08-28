import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/auth — Validate admin credentials (server-side only, no client exposure)
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

    // Check against explicit admin credentials OR process.env credentials
    const isExplicitMatch = inputEmail === "monkpodcast@gmail.com" && inputPassword === "Monk@1234";
    const isEnvMatch = envEmail !== "" && envPassword !== "" && inputEmail === envEmail && inputPassword === envPassword;

    if (!isExplicitMatch && !isEnvMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const validAdminKey = isExplicitMatch ? "Monk@1234" : envPassword;

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        data: { adminKey: validAdminKey },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
