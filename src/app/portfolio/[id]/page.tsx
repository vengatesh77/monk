import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, User, Folder, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio Project Details | Monk Podcast Studio",
  description: "Explore detailed view of production projects by Monk Podcast Studio in Coimbatore.",
};

const sampleProjects: Record<string, { title: string; category: string; description: string; client: string; image: string; images: string[]; videoUrl?: string }> = {
  "podcast-show-1": {
    title: "Brand Storytelling Podcast",
    category: "Podcast Production",
    description: "A multi-episode podcast series focusing on brand stories, founder interviews, and high-quality audio mastering produced at Monk Podcast Studio.",
    client: "Coimbatore Entrepreneurs Forum",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=80&auto=format",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&auto=format",
    ],
  },
  "branding-video-1": {
    title: "E-Commerce Product Commercial",
    category: "Branding Videos",
    description: "Creative product commercial and video campaign produced in studio with professional lighting and 4K cinematography.",
    client: "Sasha Retail Co.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80&auto=format",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1525183480399-e8706926adac?w=800&q=80&auto=format",
    ],
  },
  "podcast-show-2": {
    title: "Tech Trends Podcast",
    category: "Podcast Production",
    description: "A multi-camera video podcast series with crisp audio capture and custom animated lower thirds.",
    client: "NextGen Media",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80&auto=format",
    images: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80&auto=format",
    ],
  },
};

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = sampleProjects[id] || {
    title: `Project ${id.replace(/-/g, " ")}`,
    category: "Production Showcase",
    description: "Professional podcast, video production, or photography showcase crafted at Monk Podcast Studio in Coimbatore.",
    client: "Valued Client",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1647528903302-e39d43912d3a?w=800&q=80&auto=format",
    ],
  };

  return (
    <div className="pt-28 md:pt-32 pb-20 bg-white min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Title & Metadata */}
        <div className="mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#8f11a8] bg-[#ebe4ff] px-3 py-1 rounded-full mb-3">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d141a] leading-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span>Client: <strong>{project.client}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-gray-400" />
              <span>Category: <strong>{project.category}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Year: <strong>2025</strong></span>
            </div>
          </div>
        </div>

        {/* Main Banner Image */}
        <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden shadow-md mb-10 border border-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Description */}
        <div className="prose max-w-none text-[#56585e] text-base md:text-lg leading-relaxed mb-12">
          <h3 className="text-xl font-bold text-[#0d141a] mb-3">Project Overview</h3>
          <p>{project.description}</p>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#0d141a] mb-6">Production Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((imgUrl, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="bg-[#f5f5f5] rounded-[24px] p-8 md:p-10 text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-[#0d141a] mb-2">Want a similar production for your brand?</h3>
          <p className="text-gray-500 mb-6 text-sm md:text-base">Book a session at Monk Podcast Studio and elevate your content.</p>
          <Link href="/booking" className="btn-primary inline-flex">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
}
