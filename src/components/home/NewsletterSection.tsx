"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thank you for reaching out!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="bg-[#f5f5f5] py-20 md:py-28">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d141a] leading-tight mb-4 tracking-tight">
            Reserve Your Spot at Monk Podcast Studio
          </h2>
          {/* Subtitle */}
          <p className="text-[#727586] text-base md:text-lg mb-10 leading-relaxed font-normal max-w-xl mx-auto">
            Bring your story to life with professional podcast, photo, and video production — at Coimbatore’s best podcast studio.
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <p className="text-[#0d141a] font-semibold text-base">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
              <div className="text-left">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-semibold text-[#0d141a] mb-2"
                >
                  Your Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here"
                  required
                  disabled={isLoading}
                  className="w-full bg-white border border-[#dadce0] rounded-xl px-4 py-3.5 text-sm text-[#0d141a] placeholder:text-gray-400 focus:outline-none focus:border-[#0d141a] focus:ring-1 focus:ring-[#0d141a] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-[#0d141a] hover:bg-black text-white font-medium py-3.5 px-8 rounded-full text-sm shadow-sm transition-all duration-300 disabled:opacity-60 cursor-pointer min-h-[48px]"
                id="newsletter-submit-btn"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Your Inquiry"
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-red-500 text-xs font-medium">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
