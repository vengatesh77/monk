"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-16 border-t border-gray-800">
      <div className="container-custom max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Column 1: Explore */}
          <div className="space-y-6">
            <h5 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Explore</h5>
            <p className="text-white text-sm sm:text-base leading-relaxed max-w-sm">
              Turning your ideas into impactful podcasts and stories.
            </p>
            <a
              href="https://www.instagram.com/monkpodcaststudio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-white hover:text-gray-300 hover:border-gray-400 hover:scale-110 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Column 2: CONNECT */}
          <div className="space-y-4">
            <h6 className="text-sm font-bold tracking-widest uppercase text-white">
              CONNECT
            </h6>

            <div className="space-y-3 pt-1">
              <p className="text-white text-sm sm:text-base">
                <a href="tel:+919080644504" className="hover:text-gray-300 transition-colors">
                  +91 90806 44504
                </a>
              </p>

              <p className="text-white text-sm sm:text-base">
                <a href="mailto:monkstudio2025@gmail.com" className="hover:text-gray-300 transition-colors">
                  monkstudio2025@gmail.com
                </a>
              </p>

              <div className="text-white text-sm sm:text-base leading-relaxed pt-3 space-y-1">
                <p>3rd Floor, Sasha Building,</p>
                <p>130 East Venkatasamy Road,</p>
                <p>R.S.Puram, Coimbatore - 641002,</p>
                <p>Tamil Nadu, India.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
