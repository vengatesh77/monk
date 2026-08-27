import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().trim().min(1, "First name is required").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(5, "Please enter a valid phone number")
    .max(25, "Phone number too long"),
  subject: z.string().optional().default("General Contact Inquiry"),
  message: z.string().trim().min(1, "Message is required"),
});

// POST /api/contact — Submit a contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both name/firstName and phone/contactNumber keys
    const inputData = {
      name: (body.name || body.firstName || "").toString().trim(),
      email: (body.email || "").toString().trim(),
      phone: (body.phone || body.contactNumber || "").toString().trim(),
      subject: (body.subject || "General Contact Inquiry").toString().trim(),
      message: (body.message || "").toString().trim(),
    };

    const parsed = contactSchema.safeParse(inputData);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0].message || "Validation failed",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    // 1. Save contact inquiry to MongoDB Atlas
    await connectDB();
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject,
      message,
    });

    // 2. Send emails using Nodemailer + Gmail SMTP (if credentials are present)
    const adminEmail = process.env.ADMIN_EMAIL || "vengateshvengat378@gmail.com";
    const rawPassword = process.env.ADMIN_EMAIL_PASSWORD || "";
    const cleanPassword = rawPassword.replace(/\s+/g, "").trim();

    if (cleanPassword && cleanPassword !== "your_gmail_app_password") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: adminEmail,
            pass: cleanPassword,
          },
        });

        const fromString = `"Monk Podcast Studio" <${adminEmail}>`;

        // A. Student Confirmation Email
        await transporter.sendMail({
          from: fromString,
          to: email,
          subject: "Thank you for contacting Monk Podcast Studio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333; border: 1px solid #eeeeee; border-radius: 8px;">
              <h2 style="color: #0d141a; margin-top: 0;">Hello ${name},</h2>
              <p>Thank you for contacting <strong>Monk Podcast Studio</strong>.</p>
              <p>We have successfully received your message. Our team will review your request and contact you soon.</p>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <h3 style="color: #0d141a; margin-bottom: 10px;">Your Submitted Details:</h3>
              <p style="margin: 6px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 6px 0;"><strong>Contact Number:</strong> ${phone}</p>
              <p style="margin: 6px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 6px 0;"><strong>Message:</strong></p>
              <div style="background-color: #f9f9f9; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; margin-top: 4px;">${message}</div>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="margin-bottom: 4px;">Regards,</p>
              <p style="margin-top: 0; font-weight: bold; color: #0d141a;">Monk Podcast Studio<br/><span style="font-weight: normal; color: #666666;">Coimbatore</span></p>
            </div>
          `,
        });

        // B. Admin Notification Email
        await transporter.sendMail({
          from: fromString,
          to: adminEmail,
          subject: "New Contact Inquiry - Monk Podcast Studio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333; border: 1px solid #eeeeee; border-radius: 8px;">
              <h2 style="color: #0d141a; margin-top: 0;">New Contact Inquiry Received</h2>
              <p style="margin: 6px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 6px 0;"><strong>Contact Number:</strong> ${phone}</p>
              <p style="margin: 6px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 6px 0;"><strong>Message:</strong></p>
              <div style="background-color: #f9f9f9; padding: 12px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; margin-top: 4px;">${message}</div>
              <p style="margin-top: 16px; font-size: 12px; color: #888888;">
                Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Nodemailer SMTP email delivery error:", emailError);
        return NextResponse.json(
          {
            success: false,
            message: "Unable to send confirmation email. Please try again later.",
          },
          { status: 500 }
        );
      }
    } else {
      console.warn("ADMIN_EMAIL_PASSWORD is not set. Email dispatch skipped.");
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Monk Podcast Studio. Your message has been received successfully. We will contact you soon.",
        data: { id: contact._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact POST database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET /api/contact — Admin: retrieve all contacts
export async function GET(req: NextRequest) {
  try {
    // Simple admin auth check via header
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, message: "Contacts retrieved", data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
