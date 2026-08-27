import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Video Production",
    description:
      "Creative product shoots and branding videos that capture your brand's essence and story.",
    image: "/images/services-video.jpg",
    href: "/services/video-production",
  },
  {
    title: "Podcast Production",
    description:
      "Professional podcast production that brings your voice and vision to life with clarity.",
    image: "/images/services-podcast.jpg",
    href: "/services/podcast-production",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d141a] leading-tight mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-[#727586] text-base md:text-lg font-normal">
            Shaping ideas into podcasts and videos that leave an impact.
          </p>
        </div>

        {/* Services Grid matching exact monkpodcaststudio.in reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Top Text Content Area */}
              <div className="bg-[#F5F5F5] p-8 md:p-10 min-h-[190px] flex flex-col justify-start">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d141a] mb-3 group-hover:text-[#8f11a8] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#727586] text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Image Area */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
