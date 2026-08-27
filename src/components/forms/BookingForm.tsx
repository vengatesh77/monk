"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { SERVICE_OPTIONS } from "@/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  peopleCount: z.coerce.number().min(1, "At least 1 person required"),
  message: z.string().optional(),
});

type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  peopleCount: number;
  message?: string;
};

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: { peopleCount: 1 },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitStatus("success");
        setStatusMessage(json.message);
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
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 bg-[#f4f4f6] rounded-[24px] p-8 md:p-10 border border-gray-100 shadow-sm">
        <CheckCircle2 className="w-14 h-14 text-green-500" />
        <h3 className="text-xl font-bold text-[#111111]">Booking Submitted!</h3>
        <p className="text-gray-600 text-sm max-w-xs">{statusMessage}</p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors mt-2"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f6] rounded-[24px] p-8 md:p-10 shadow-sm border border-gray-100">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5" noValidate>
        {/* Row 1: Full Name */}
        <div>
          <label
            htmlFor="booking-name"
            className="block text-sm font-semibold text-[#222222] mb-1.5"
          >
            Your Full Name<span className="text-red-500">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Row 2: Contact Number & Email Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="booking-phone"
              className="block text-sm font-semibold text-[#222222] mb-1.5"
            >
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              id="booking-phone"
              type="tel"
              placeholder="+91 90806 44504"
              {...register("phone")}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-email"
              className="block text-sm font-semibold text-[#222222] mb-1.5"
            >
              Your Email Address<span className="text-red-500">*</span>
            </label>
            <input
              id="booking-email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Service Required */}
        <div>
          <label
            htmlFor="booking-service"
            className="block text-sm font-semibold text-[#222222] mb-1.5"
          >
            Service Required<span className="text-red-500">*</span>
          </label>
          <select
            id="booking-service"
            {...register("service")}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            disabled={isSubmitting}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-red-500 text-xs">{errors.service.message}</p>
          )}
        </div>

        {/* Row 4: Preferred Date & Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="booking-date"
              className="block text-sm font-semibold text-[#222222] mb-1.5"
            >
              Preferred Date<span className="text-red-500">*</span>
            </label>
            <input
              id="booking-date"
              type="date"
              {...register("preferredDate")}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.preferredDate && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.preferredDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-time"
              className="block text-sm font-semibold text-[#222222] mb-1.5"
            >
              Preferred Time<span className="text-red-500">*</span>
            </label>
            <select
              id="booking-time"
              {...register("preferredTime")}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              disabled={isSubmitting}
            >
              <option value="">Select time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.preferredTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Brief Description / Notes */}
        <div>
          <label
            htmlFor="booking-message"
            className="block text-sm font-semibold text-[#222222] mb-1.5"
          >
            Brief Description / Notes
          </label>
          <textarea
            id="booking-message"
            rows={3}
            placeholder="Briefly describe your session requirements"
            {...register("message")}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Error notification */}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-xs">{statusMessage}</p>
          </div>
        )}

        {/* Submit CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#2a2a2a] hover:bg-black text-white font-medium py-3.5 px-8 rounded-full text-sm shadow-md transition-all disabled:opacity-60 mt-3 min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
          id="booking-submit-btn"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Booking...
            </span>
          ) : (
            "Confirm Booking Session"
          )}
        </button>
      </form>
    </div>
  );
}
