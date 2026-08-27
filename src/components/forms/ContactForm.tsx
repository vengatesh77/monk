"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "First name is mandatory"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
});

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message?: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitStatus("success");
        setStatusMessage(json.message || "Thank you for reaching out!");
        reset();
      } else {
        setSubmitStatus("error");
        setStatusMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div
        style={{
          background: "#F5F5F5",
          borderRadius: "20px",
          padding: "40px",
          fontFamily: "'Montserrat', sans-serif",
        }}
        className="text-center space-y-4"
      >
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0d141a" }}>Message Sent!</h3>
        <p style={{ fontSize: "14px", color: "#56585e" }}>{statusMessage}</p>
        <button
          onClick={() => setSubmitStatus("idle")}
          style={{
            background: "#3C3C3C",
            color: "#ffffff",
            borderRadius: "999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
          className="hover:bg-black transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F5F5F5",
        borderRadius: "20px",
        padding: "40px",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5" noValidate>
        {/* Your First Name* */}
        <div>
          <label
            htmlFor="contact-name"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d141a",
              marginBottom: "8px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Your First Name*
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Enter your first name"
            {...register("name")}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #b8c0cc",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "16px",
              color: "#0d141a",
              outline: "none",
              fontFamily: "'Montserrat', sans-serif",
            }}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Contact Number* */}
        <div>
          <label
            htmlFor="contact-phone"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d141a",
              marginBottom: "8px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Contact Number*
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="+91 90806 44504"
            {...register("phone")}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #b8c0cc",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "16px",
              color: "#0d141a",
              outline: "none",
              fontFamily: "'Montserrat', sans-serif",
            }}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        {/* Your Email Address* */}
        <div>
          <label
            htmlFor="contact-email"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d141a",
              marginBottom: "8px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Your Email Address*
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #b8c0cc",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "16px",
              color: "#0d141a",
              outline: "none",
              fontFamily: "'Montserrat', sans-serif",
            }}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Your Message */}
        <div>
          <label
            htmlFor="contact-message"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#0d141a",
              marginBottom: "8px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Your Message
          </label>
          <textarea
            id="contact-message"
            rows={3}
            placeholder="Briefly describe your needs"
            {...register("message")}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #b8c0cc",
              borderRadius: "10px",
              padding: "14px 16px",
              fontSize: "16px",
              color: "#0d141a",
              outline: "none",
              resize: "none",
              fontFamily: "'Montserrat', sans-serif",
            }}
            disabled={isSubmitting}
          />
        </div>

        {/* Error status */}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-xs">{statusMessage}</p>
          </div>
        )}

        {/* Submit Pill Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#3C3C3C",
              color: "#ffffff",
              borderRadius: "999px",
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: 400,
              cursor: "pointer",
              border: "none",
              fontFamily: "'Montserrat', sans-serif",
              transition: "background-color 0.2s ease",
            }}
            className="hover:bg-black disabled:opacity-60"
            id="contact-submit-btn"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Your Message"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
