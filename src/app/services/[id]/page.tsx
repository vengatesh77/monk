import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Details | Monk Podcast Studio",
  description: "Detailed service options and packages offered by Monk Podcast Studio in Coimbatore.",
};

const serviceDetails: Record<string, { title: string; subtitle: string; description: string; features: string[]; image: string }> = {
  "podcast-production": {
    title: "Podcast Production",
    subtitle: "End-to-end recording, multi-cam video capture, and broadcast audio editing.",
    description: "Our podcast production suite is equipped with broadcast-grade Shure dynamic microphones, multi-camera 4K recording, sound-treated acoustic wall panels, and professional live audio monitoring. Whether launching a new audio show or scaling your video podcast on YouTube, our team handles recording, editing, and distribution setup.",
    features: [
      "Acoustically treated studio space",
      "Multi-channel broadcast microphone setup",
      "4K Multi-camera video podcast capture",
      "Professional audio mixing & mastering",
      "Custom intro/outro sound design",
      "Episode thumbnail & snippet creation",
    ],
    image: "https://images.unsplash.com/photo-1647528903302-e39d43912d3a?w=1200&q=80&auto=format",
  },
  "video-production": {
    title: "Video Production & Brand Shoots",
    subtitle: "High-impact product videos, founder stories, and brand commercial shoots.",
    description: "Bring your product and brand story to life with state-of-the-art studio lighting, high-definition cinematography, and creative direction. We help creators, startups, and brands produce commercial videos engineered for Instagram Reels, YouTube, and digital ads.",
    features: [
      "Professional studio lighting rigs",
      "Cinematic 4K camera gear",
      "Product photography & videography stages",
      "Color grading & visual post-production",
      "Vertical video formats for social media",
      "Creative direction & scripting support",
    ],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80&auto=format",
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = serviceDetails[id] || {
    title: `${id.replace(/-/g, " ").toUpperCase()} Service`,
    subtitle: "Professional creative studio service tailored for creators and businesses.",
    description: "Comprehensive production services designed to elevate your brand presence with top-tier equipment and experienced creative directors.",
    features: [
      "Broadcast quality audio & video recording",
      "Dedicated sound engineer and studio manager",
      "Comfortable air-conditioned lounge for guests",
      "Flexible hourly booking options",
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format",
  };

  return (
    <div className="pt-28 md:pt-32 pb-20 bg-white min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d141a] leading-tight mb-3">
            {service.title}
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-normal">
            {service.subtitle}
          </p>
        </div>

        {/* Main Banner Image */}
        <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden shadow-md mb-10 border border-gray-100">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overview */}
        <div className="prose max-w-none text-[#56585e] text-base md:text-lg leading-relaxed mb-10">
          <h2 className="text-2xl font-bold text-[#0d141a] mb-3">What We Offer</h2>
          <p>{service.description}</p>
        </div>

        {/* Features Checklist */}
        <div className="bg-[#f8f9fa] rounded-[24px] p-8 mb-12 border border-gray-100">
          <h3 className="text-xl font-bold text-[#0d141a] mb-6">Service Highlights &amp; Inclusions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-[#0d141a] text-sm md:text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <div className="bg-[#0d141a] text-white rounded-[24px] p-8 md:p-12 text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Start Your Session?</h3>
          <p className="text-gray-300 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Reserve your preferred studio time slot with our team today.
          </p>
          <Link href="/booking" className="btn-outline-white inline-flex bg-white text-[#0d141a] font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all">
            Book This Session
          </Link>
        </div>
      </div>
    </div>
  );
}
