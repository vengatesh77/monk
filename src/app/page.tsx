import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monk Podcast Studio in Coimbatore - Book Now",
  description:
    "Discover Monk Podcast Studio in R.S. Puram, Coimbatore, offering professional podcast recording, video production, and brand storytelling services. Book your session today and elevate your content!",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <NewsletterSection />
      <Testimonials />
    </>
  );
}
