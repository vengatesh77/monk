"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServicesPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Title Section */}
      <section className="pt-32 pb-10 text-center px-4">
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#0d141a",
            marginBottom: "16px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Our Services
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#56585e",
            lineHeight: 1.5,
            maxWidth: "680px",
            margin: "0 auto",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Monk Podcast Studio in Coimbatore transforms ideas into impactful podcasts, videos, and branding content for creators and businesses.
        </p>
      </section>

      {/* Main Services Two-Column Layout Section */}
      <section className="px-4 pb-20" style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Studio Shoot Image */}
          <div className="lg:col-span-6">
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                width: "100%",
                aspectRatio: "612/510",
              }}
              className="shadow-sm"
            >
              <Image
                src="/images/services-main.jpg"
                alt="Monk Podcast Studio production session with Digitek lighting setup"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right Column — 3 Service Blocks */}
          <div className="lg:col-span-6 space-y-8 pl-0 lg:pl-4">
            {/* 1. Branding Services */}
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Branding Services
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Professional branding and video production services in Coimbatore that strengthen your visual identity and showcase your story with impact.
              </p>
            </div>

            {/* 2. Podcast Production */}
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
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
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Monk Podcast Studio offers professional podcast production in Coimbatore, tailored to your unique storytelling needs and designed to make your brand stand out.
              </p>
            </div>

            {/* 3. Photo/Video Production */}
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Photo/Video Production
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Professional product photography and branding videos in Coimbatore that highlight your products and captivate your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQ) Section ── */}
      <section
        style={{
          background: "#ffffff",
          padding: "80px 16px 96px 16px",
        }}
      >
        <div style={{ maxWidth: "1224px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              color: "#0d141a",
              lineHeight: 1.3,
              marginBottom: "48px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-10 max-w-4xl">
            {/* FAQ 1 */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                What services do you offer?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                We offer podcast production, product shoots, and branding videos to enhance your storytelling.
              </p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                How can I book a session?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                You can reach us easily through the contact number provided call, WhatsApp, or visit our studio directly in Coimbatore.
              </p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Where is your studio located?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Our studio is located in R.S. Puram, Coimbatore. Easily accessible for all clients. Visit us at 3rd Floor, Sasha Building, 130, E Venkatasamy Road, R.S. Puram, Coimbatore, Tamil Nadu 641002.
              </p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Can I view the studio before booking?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Absolutely! You&apos;re welcome to visit and tour our studio before booking. Please give us a call or WhatsApp to schedule a convenient time for your visit.
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d141a",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Can I see your portfolio?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#56585e",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Yes, our website showcases our portfolio and client experiences for your review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Monk Podcast Studio Plans Section (Dark Section Above Footer Matching Screenshot) ── */}
      <section
        style={{
          background: "rgb(60, 60, 60)",
          padding: "80px 16px 88px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.3,
              marginBottom: "12px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Monk Podcast Studio Plans
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.5,
              marginBottom: "40px",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Unlock Your Storytelling Potential Today
          </p>

          {/* Inquiry Form */}
          {submitted ? (
            <div
              style={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 500,
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Thank you for reaching out! We will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left space-y-6">
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#ffffff",
                    marginBottom: "8px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    border: "1px solid #dadce0",
                    background: "#ffffff",
                    color: "#0d141a",
                    fontSize: "16px",
                    outline: "none",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: "none",
                  }}
                  className="hover:underline"
                >
                  Send Your Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
