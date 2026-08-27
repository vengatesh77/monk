import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Target, Heart, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Monk Podcast Studio — Coimbatore's leading podcast, video, and photo production studio. Our mission, values, and team.",
};

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every project receives meticulous attention to detail, ensuring the highest quality output.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We are deeply passionate about storytelling and bring that energy to every session.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We stay ahead with the latest equipment and creative techniques to deliver cutting-edge results.",
  },
];

const whyUs = [
  "State-of-the-art acoustically treated studio",
  "Professional-grade 4K cameras and lighting",
  "Experienced team of audio engineers & videographers",
  "Full post-production and editing services",
  "Flexible scheduling for businesses and creators",
  "Centrally located in R.S. Puram, Coimbatore",
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d141a 0%, #1a1a1a 60%, #2a1030 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8f11a8]/15 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block text-[#8f11a8] font-semibold text-sm uppercase tracking-widest mb-4">
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              About Monk
              <br />
              <span className="text-gradient">Podcast Studio</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              We are Coimbatore&apos;s leading podcast, video, and photo production
              studio — dedicated to helping businesses, creators, and
              professionals transform their ideas into impactful digital
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&q=80&auto=format"
                  alt="Monk Podcast Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#8f11a8]/10 rounded-2xl -z-10" />
            </div>
            <div>
              <div className="inline-block text-[#8f11a8] font-semibold text-sm uppercase tracking-widest mb-3">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d141a] leading-tight mb-6">
                Creating Impact Through{" "}
                <span className="text-gradient">Authentic Storytelling</span>
              </h2>
              <p className="text-[#56585e] text-base leading-relaxed mb-4">
                At Monk Podcast Studio, we believe every brand has a story worth
                telling. Our mission is to give creators, entrepreneurs, and
                businesses the tools, space, and expertise to tell those stories
                with clarity, creativity, and confidence.
              </p>
              <p className="text-[#56585e] text-base leading-relaxed mb-8">
                Founded in Coimbatore with a passion for audio-visual excellence,
                we provide end-to-end production services — from concept to
                delivery. Whether you&apos;re a first-time podcaster or an established
                brand, we create an environment where your vision can thrive.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f5f5f5] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0d141a]">200+</div>
                  <div className="text-[#56585e] text-sm mt-1">Sessions Completed</div>
                </div>
                <div className="bg-[#f5f5f5] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0d141a]">150+</div>
                  <div className="text-[#56585e] text-sm mt-1">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#f5f5f5]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block text-[#8f11a8] font-semibold text-sm uppercase tracking-widest mb-3">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d141a]">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-8 text-center card-hover shadow-sm"
                >
                  <div className="w-14 h-14 bg-[#0d141a] rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0d141a] mb-3">{v.title}</h3>
                  <p className="text-[#56585e] text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-[#8f11a8] font-semibold text-sm uppercase tracking-widest mb-3">
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d141a] leading-tight mb-8">
                Everything You Need for
                <br />
                <span className="text-gradient">World-Class Production</span>
              </h2>
              <ul className="space-y-4">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8f11a8] shrink-0" />
                    <span className="text-[#0d141a] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/booking" className="btn-primary">
                  Book a Session
                </Link>
                <Link href="/contact" className="btn-outline-dark">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=700&q=80&auto=format"
                  alt="Professional studio setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0d141a, #2a1030)" }}
      >
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Tell Your Story?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of creators and businesses who trust Monk Podcast
            Studio for their production needs.
          </p>
          <Link href="/booking" className="btn-primary">
            Book Your Session Now
          </Link>
        </div>
      </section>
    </div>
  );
}
