import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-20 lg:py-24 relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #0d141a 0%, #1a1a1a 60%, #2a1030 100%)",
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8f11a8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#8f11a8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container-custom text-center max-w-4xl mx-auto">
        {/* Label */}
        <div className="inline-block text-[#8f11a8] font-bold text-xs uppercase tracking-widest mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
          READY TO START?
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Let&apos;s Create Something{" "}
          <span className="text-gradient block sm:inline">
            Extraordinary Together
          </span>
        </h2>

        {/* Supporting Description */}
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you&apos;re launching a podcast, creating a brand video, or
          capturing stunning imagery — we&apos;re here to make it happen.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/contact" className="btn-primary group w-full sm:w-auto">
            Book a Session
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-outline group w-full sm:w-auto">
            Get in Touch
          </Link>
        </div>

        {/* Quick Contact Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-gray-300 text-sm font-medium">
          <a
            href="tel:+919080644504"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-[#8f11a8]" />
            +91 90806 44504
          </a>
          <a
            href="mailto:monkstudio2025@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-[#8f11a8]" />
            monkstudio2025@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
