import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content Side */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d141a] leading-[1.15] tracking-tight">
              About Monk<br />Podcast Studio
            </h2>

            <p className="text-[#56585e] text-base md:text-lg leading-relaxed pt-2">
              At Monk Podcast Studio, don’t just make content. Create a brand with us, own the spotlight, and let your story shine louder than ever.
            </p>

            <p className="text-[#56585e] text-base md:text-lg leading-relaxed">
              We are <strong className="text-[#0d141a]">Coimbatore’s leading podcast, video, and photo production studio</strong>, dedicated to helping businesses, creators, and professionals transform their ideas into impactful digital experiences. Whether you want to launch a <strong className="text-[#0d141a]">professional podcast</strong>, produce <strong className="text-[#0d141a]">high-quality video content</strong>, or capture stunning <strong className="text-[#0d141a]">brand photography</strong>, our expert team ensures your story is told with creativity, clarity, and consistency.
            </p>

            <div className="pt-6">
              <Link
                href="/services"
                className="border border-[#0d141a] text-[#0d141a] hover:bg-[#0d141a] hover:text-white font-medium py-3.5 px-8 rounded-full text-base transition-all duration-300 inline-flex items-center justify-center min-h-[48px]"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[768/877] rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/images/about-presenter.jpg"
                alt="Monk Podcast Studio Presenter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
