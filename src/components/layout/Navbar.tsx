"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] flex items-center ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container-custom relative flex items-center justify-between w-full">
        {/* Logo (Left) — Exact Original Logo Image */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
            <Image
              src="/images/logo.jpg"
              alt="Monk Podcast Studio Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links (Centered in Navbar) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#0d141a] font-semibold text-sm hover:text-[#8f11a8] transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8f11a8] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger (Right) */}
        <button
          id="mobile-menu-btn"
          className="md:hidden p-2 rounded-lg text-[#0d141a] hover:bg-gray-100 transition-colors ml-auto"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileOpen && (
        <div className="absolute top-[80px] left-0 right-0 md:hidden bg-white border-b border-gray-100 shadow-xl animate-slide-down">
          <nav className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#0d141a] font-semibold text-base py-2 border-b border-gray-100 hover:text-[#8f11a8] transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
