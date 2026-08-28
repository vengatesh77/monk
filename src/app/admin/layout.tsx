import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Monk Podcast Studio",
  robots: { index: false, follow: false },
};

// Admin pages get their own bare layout — no Navbar, Footer, or WhatsApp button
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
