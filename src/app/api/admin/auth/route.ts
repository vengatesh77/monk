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

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("Admin credentials are not configured in environment variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const emailMatch = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passwordMatch = password === adminPassword;

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
