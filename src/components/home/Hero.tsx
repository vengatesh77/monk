import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden pt-28 pb-20"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1647528903302-e39d43912d3a?w=1920&q=80&auto=format')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark semi-transparent overlay matching reference site */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 container-custom max-w-4xl mx-auto px-4 text-white">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
          Transform Your Ideas into Stories
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Professional Podcast &amp; Video Production Studio in Coimbatore
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/contact"
            className="border-2 border-white text-white hover:bg-white hover:text-[#0d141a] font-medium py-3.5 px-9 rounded-full text-base transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] shadow-lg"
          >
            Book a Session
          </Link>
          <Link
            href="/services"
            className="border-2 border-white text-white hover:bg-white hover:text-[#0d141a] font-medium py-3.5 px-9 rounded-full text-base transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] shadow-lg"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
