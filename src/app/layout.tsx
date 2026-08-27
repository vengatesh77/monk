import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Monk Podcast Studio | Podcast, Video & Photography Studio in Coimbatore",
    template: "%s | Monk Podcast Studio",
  },
  description:
    "Discover Monk Podcast Studio in R.S. Puram, Coimbatore. Professional podcast recording, video production, and brand photography. Book your session today!",
  keywords: [
    "monk podcast studio",
    "podcast studio coimbatore",
    "video production coimbatore",
    "photography coimbatore",
    "podcast recording",
    "brand videos",
  ],
  authors: [{ name: "Monk Podcast Studio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://monkpodcaststudio.in",
    siteName: "Monk Podcast Studio",
    title: "Monk Podcast Studio | Podcast, Video & Photography Studio in Coimbatore",
    description:
      "Professional podcast recording, video production, and brand photography in Coimbatore. Where stories find their true voice.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monk Podcast Studio",
    description:
      "Professional podcast recording, video production, and brand photography in Coimbatore.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased bg-white text-[#0d141a]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
