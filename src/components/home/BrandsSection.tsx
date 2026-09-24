import Image from "next/image";

const brands = [
  { src: "/images/brands/brand-1-re.png", alt: "Re Logo" },
  { src: "/images/brands/brand-2-10x.png", alt: "10X League Logo" },
  { src: "/images/brands/brand-3-academy.png", alt: "Brand Monk Academy Logo" },
  { src: "/images/brands/brand-4-consulting.png", alt: "Brand Monk Consulting Logo" },
  { src: "/images/brands/brand-5-zutail.png", alt: "Zutail Logo" },
  { src: "/images/brands/brand-6-zomibi.png", alt: "Zomibi Gourmet Logo" },
];

export default function BrandsSection() {
  return (
    <section
      style={{
        background: "rgb(255, 255, 255)",
        padding: "80px 16px 64px 16px",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1224px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 600,
            color: "#0d141a",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: "56px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Trusted by Leading Brands
        </h2>

        <div className="flex flex-nowrap items-center justify-center gap-6 md:gap-10 overflow-x-auto">
          {brands.map((brand) => (
            <div
              key={brand.src}
              className="relative shrink-0 w-[200px] h-[150px] md:w-[240px] md:h-[170px] flex items-center justify-center"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 200px, 240px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
