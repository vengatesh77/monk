"use client";

import ContactForm from "@/components/forms/ContactForm";
import Image from "next/image";

const hoursData = [
  { day: "Monday", time: "(8am - 8pm)" },
  { day: "Tuesday", time: "(8am - 8pm)" },
  { day: "Wednesday", time: "(8am - 8pm)" },
  { day: "Thursday", time: "(8am - 8pm)" },
  { day: "Friday", time: "(8am - 8pm)" },
  { day: "Saturday", time: "(8am - 8pm)" },
];

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Header Section */}
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
          Get in Touch
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
          Reach out today to discuss your next video project.
        </p>
      </section>

      {/* Main Two-Column Contact Form + Studio Image Section */}
      <section className="px-4 pb-20" style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6">
            <ContactForm />
          </div>

          {/* Right Column: Exact High-Res Studio Image */}
          <div className="lg:col-span-6">
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                width: "100%",
                aspectRatio: "568/561",
                minHeight: "480px",
              }}
              className="shadow-sm"
            >
              <Image
                src="/images/contact-exact.jpg"
                alt="Monk Podcast Studio - Studio setup with softbox and globe lamp"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Location & Hours Section (Matching Exact Original Screenshot) ── */}
      <section className="py-16 px-4 bg-white" style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Location */}
          <div className="md:col-span-6">
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "#0d141a",
                lineHeight: 1.3,
                marginBottom: "24px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Location
            </h2>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 400,
                color: "#56585e",
                lineHeight: 1.4,
                maxWidth: "460px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Visit us at 3rd Floor, Sasha Building, 130, E Venkatasamy Road, R.S. Puram, Coimbatore, Tamil Nadu 641002.”
            </p>
          </div>

          {/* Right Column: Hours */}
          <div className="md:col-span-6">
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "#0d141a",
                lineHeight: 1.3,
                marginBottom: "24px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Hours
            </h2>
            <div className="space-y-3 max-w-xs">
              {hoursData.map((item) => (
                <div
                  key={item.day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#56585e",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <span className="w-28">{item.day}</span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Width Google Map Embed matching exact location */}
        <div
          style={{
            borderRadius: "0px",
            overflow: "hidden",
            width: "100%",
            height: "400px",
            position: "relative",
          }}
          className="shadow-sm border border-gray-100"
        >
          <iframe
            src="https://maps.google.com/maps?q=3rd%20floor,%20Sasha%20Building,%20130,%20E%20Venkatasamy%20Rd,%20R.S.%20Puram,%20Coimbatore,%20Tamil%20Nadu%20641002&t=m&z=13&ie=UTF8&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Monk Podcast Studio Location Map"
          />
        </div>
      </section>
    </div>
  );
}
