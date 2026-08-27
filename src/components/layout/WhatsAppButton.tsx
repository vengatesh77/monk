"use client";

import Image from "next/image";

export default function WhatsAppButton() {
  const whatsappNumber = "919080644504";
  const defaultMessage = encodeURIComponent(
    "👋 Hi there! I'd like to inquire about booking a session at Monk Podcast Studio."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
      aria-label="Chat on WhatsApp"
      id="floating-whatsapp-btn"
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden drop-shadow-lg">
        <Image
          src="/images/whatsapp.svg"
          alt="WhatsApp Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
    </a>
  );
}
