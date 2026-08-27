import Image from "next/image";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d141a] leading-tight mb-3 tracking-tight">
            Client Feedback
          </h2>
          <p className="text-[#727586] text-base md:text-lg font-normal">
            Hear what our clients say about us.
          </p>
        </div>

        {/* Testimonial Cards Layout matching exact monkpodcaststudio.in screenshot 2 */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Top Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Daniel Dani */}
            <div className="bg-[#F5F5F5] p-8 md:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#0d141a] font-bold text-lg tracking-widest mb-4">
                  ★★★★★
                </div>
                <p className="text-[#727586] text-sm md:text-base leading-relaxed mb-8">
                  I came here for a product shoot and it went really well. The setup is professional, the vibe is nice, and the team is super friendly.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1525183480399-e8706926adac?auto=format&fit=crop&w=100&h=100"
                    alt="Daniel Dani"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-[#0d141a] text-base leading-tight">
                    Daniel Dani
                  </div>
                  <div className="text-[#727586] text-sm mt-0.5">
                    R.S. Puram
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Siva kumar */}
            <div className="bg-[#F5F5F5] p-8 md:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="text-[#0d141a] font-bold text-lg tracking-widest mb-4">
                  ★★★★★
                </div>
                <p className="text-[#727586] text-sm md:text-base leading-relaxed mb-8">
                  Wonderful experience as i did an E commerce photoshoot, very friendly and fantastic environment .Best studio in the middle of the city RS puram Coimbatore.
                </p>
              </div>

              <div className="pt-2">
                <div className="font-bold text-[#0d141a] text-base leading-tight">
                  Siva kumar
                </div>
                <div className="text-[#727586] text-sm mt-0.5">
                  Coimbatore
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 1 Centered Card (Gowtham) */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-[#F5F5F5] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="text-[#0d141a] font-bold text-lg tracking-widest mb-4">
                  ★★★★★
                </div>
                <p className="text-[#727586] text-sm md:text-base leading-relaxed mb-8">
                  I recently visited Monk Podcast Studio for a product shoot and I’m impressed with the results. The setup is modern, the environment is inspiring, and the staff are truly professional and friendly. Their attention to detail and creative input made my brand look fantastic. Highly recommended for anyone looking for high-quality photo, video, or podcast production.
                </p>
              </div>

              <div className="pt-2">
                <div className="font-bold text-[#0d141a] text-base leading-tight">
                  Gowtham
                </div>
                <div className="text-[#727586] text-sm mt-0.5">
                  R.S. Puram
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
