"use client";

import Image from "next/image";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Header */}
      <section className="pt-32 pb-10 text-center px-4">
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#0d141a",
            marginBottom: "12px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Our Projects
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#56585e",
            lineHeight: 1.5,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Discover our portfolio of podcasts, photos, and videos.
        </p>
      </section>

      {/* ── SECTION 1: Podcast Production ── */}
      <section className="px-4 pb-12" style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left: Host drinking coffee at mic */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "503/360",
            }}
          >
            <Image
              src="/images/exact/podcast-1.jpg"
              alt="Podcast Production - Host drinking coffee at microphone"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Guest smiling at mic */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "503/360",
            }}
          >
            <Image
              src="/images/exact/podcast-2.jpg"
              alt="Podcast Production - Guest smiling at microphone"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#0d141a",
                lineHeight: 1.3,
                margin: 0,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Podcast Production
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#56585e",
                lineHeight: 1.5,
                marginTop: "4px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Transforming ideas into engaging audio experiences.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[#0d141a] rounded-full px-9 py-3.5 text-base font-normal text-[#0d141a] hover:bg-[#0d141a] hover:text-white transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            View Details
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: Branding Videos ── */}
      <section className="px-4 pb-16" style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left: Presenter in green polo */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              height: "360px",
            }}
          >
            <Image
              src="/images/exact/branding-1.jpg"
              alt="Branding Videos - Presenter in green polo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Centre: Dark studio desk setup */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              height: "360px",
            }}
          >
            <Image
              src="/images/exact/branding-2.jpg"
              alt="Branding Videos - Studio dark setup with ring light"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Right: Studio shoot in chair */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              height: "360px",
            }}
          >
            <Image
              src="/images/exact/branding-3.jpg"
              alt="Branding Videos - Professional studio session in chair"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#0d141a",
                lineHeight: 1.3,
                margin: 0,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Branding Videos
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#56585e",
                lineHeight: 1.5,
                marginTop: "4px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Crafting impactful visual stories for brands and businesses.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[#0d141a] rounded-full px-9 py-3.5 text-base font-normal text-[#0d141a] hover:bg-[#0d141a] hover:text-white transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* ── SECTION 3: Our Work — 6-Image Dark Gallery Section ── */}
      <section
        style={{
          background: "rgb(60, 60, 60)",
          padding: "64px 0 80px 0",
        }}
      >
        <div style={{ maxWidth: "1224px", margin: "0 auto", padding: "0 16px" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: "8px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Our Work
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.5,
              marginBottom: "40px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Discover our portfolio of powerful podcasts and visual creations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-1.jpg"
                alt="Our Work - Product photography shoot with softbox"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-2.jpg"
                alt="Our Work - Podcast interview session with guest"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-3.jpg"
                alt="Our Work - Outdoor location shoot and podcast discussion"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-4.jpg"
                alt="Our Work - Studio product shooting table setup"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-5.jpg"
                alt="Our Work - Video shoot with camera stabilizer"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }}>
              <Image
                src="/images/our-work/work-6.jpg"
                alt="Our Work - Commercial product shoot for Guru Arpan soaps"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Trusted by Leading Brands (Bigger Brand Logos Matching Original Site) ── */}
      <section
        style={{
          background: "rgb(255, 255, 255)",
          padding: "80px 16px 64px 16px",
        }}
      >
        <div style={{ maxWidth: "1224px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 600,
              color: "#0d141a",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: "56px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Trusted by Leading Brands
          </h2>

          {/* 6 Brand Logos - Prominent & Bigger size matching reference site */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-10 items-center justify-items-center">
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-1-re.png"
                alt="Re Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="920px"
              />
            </div>
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-2-10x.png"
                alt="10X League Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="920px"
              />
            </div>
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-3-academy.png"
                alt="Brand Monk Academy Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="240px"
              />
            </div>
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-4-consulting.png"
                alt="Brand Monk Consulting Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="240px"
              />
            </div>
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-5-zutail.png"
                alt="Zutail Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="240px"
              />
            </div>
            <div className="relative w-full max-w-[180px] h-[140px] flex items-center justify-center p-2">
              <Image
                src="/images/brands/brand-6-zomibi.png"
                alt="Zomibi Gourmet Logo"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                sizes="240px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Customer Testimonials (Dark Grey with Author Name Elangovan) ── */}
      <section
        style={{
          background: "rgb(60, 60, 60)",
          padding: "72px 16px 80px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Star Rating */}
          <div
            style={{
              color: "#ffffff",
              fontSize: "24px",
              letterSpacing: "4px",
              marginBottom: "20px",
            }}
          >
            ★★★★★
          </div>

          {/* Testimonial Quote */}
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.5,
              marginBottom: "32px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Monk Podcast Studio transformed our vision into an engaging video for ads. Their creativity and professionalism made the process seamless and enjoyable.
          </p>

          {/* Small Round Avatar */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 12px auto",
              position: "relative",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Image
              src="/images/brands/testimonial-avatar.jpg"
              alt="Elangovan Avatar"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          {/* Author Name - ELANGOVAN */}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#ffffff",
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Elangovan
          </p>
        </div>
      </section>
    </div>
  );
}
