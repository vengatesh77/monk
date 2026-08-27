import BookingForm from "@/components/forms/BookingForm";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session | Monk Podcast Studio",
  description:
    "Book a professional podcast, video, or photography session at Monk Podcast Studio in Coimbatore. Choose your service and preferred time slot.",
};

const hours = [
  { day: "Monday", time: "(8am - 8pm)" },
  { day: "Tuesday", time: "(8am - 8pm)" },
  { day: "Wednesday", time: "(8am - 8pm)" },
  { day: "Thursday", time: "(8am - 8pm)" },
  { day: "Friday", time: "(8am - 8pm)" },
  { day: "Saturday", time: "(8am - 8pm)" },
];

export default function BookingPage() {
  return (
    <div className="pt-28 md:pt-32 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pb-10 text-center container-custom">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-3 tracking-tight">
          Book a Session
        </h1>
        <p className="text-gray-500 text-base md:text-lg font-normal max-w-lg mx-auto">
          Reserve your podcast, video, or photo production session with our team.
        </p>
      </section>

      {/* Booking Form (60%) + Studio Photo (40%) Section */}
      <section className="pb-20 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Booking Form (~60%) */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

          {/* Right Column: Studio Photo (~40%) */}
          <div className="lg:col-span-5 relative rounded-[24px] overflow-hidden shadow-sm min-h-[480px] lg:min-h-[580px]">
            <Image
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&auto=format"
              alt="Monk Podcast Studio Setup"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-16 border-t border-gray-100 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Location */}
            <div>
              <h2 className="text-3xl font-bold text-[#111111] mb-6">
                Location
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                Visit us at 3rd Floor, Sasha Building, 130, E Venkatasamy Road, R.S. Puram, Coimbatore, Tamil Nadu 641002.
              </p>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-3xl font-bold text-[#111111] mb-6">
                Hours
              </h2>
              <div className="space-y-3 max-w-sm">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between text-gray-500 text-base"
                  >
                    <span>{item.day}</span>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="w-full">
        <div className="w-full h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2731506595543!2d76.9483853!3d11.004556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858dc2a0f0001%3A0xcd1f9b73e3e5abf7!2sR.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
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
