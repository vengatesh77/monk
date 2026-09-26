"use client";

const videos = [
  "/videos/bite-1.mp4",
  "/videos/bite-2.mp4",
  "/videos/bite-3.mp4",
  "/videos/bite-4.mp4",
];

export default function VideosSection() {
  return (
    <section
      style={{
        background: "rgb(13, 20, 26)",
        padding: "80px 16px 88px 16px",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 600,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: "12px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Bites From Social Media
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#a8adb6",
            textAlign: "center",
            marginBottom: "48px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          A glimpse of the stories we create at Monk Podcast Studio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((src) => (
            <div
              key={src}
              className="relative rounded-2xl overflow-hidden bg-black/40 aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16] transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector("video");
                if (video) void video.play();
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector("video");
                if (video) video.pause();
              }}
            >
              <video
                src={src}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
