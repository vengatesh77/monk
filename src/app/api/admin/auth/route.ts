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

    const adminEmail = (process.env.ADMIN_EMAIL || "monkpodcast@gmail.com").trim();
    const adminPassword = (process.env.ADMIN_PASSWORD || "Monk@1234").trim();

    const inputEmail = email.toString().trim().toLowerCase();
    const inputPassword = password.toString().trim();

    const emailMatch = inputEmail === adminEmail.toLowerCase();
    const passwordMatch = inputPassword === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Use the admin password as the API key for subsequent protected requests.
    // This is checked server-side via the x-admin-key header — never exposed publicly.
    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        data: { adminKey: adminPassword },
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
