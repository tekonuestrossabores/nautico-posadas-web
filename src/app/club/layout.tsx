import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Náutico Posadas",
  description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
  openGraph: {
    title: "Club Náutico Posadas",
    description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
    url: "https://nautico-posadas-web.vercel.app/club",
    siteName: "Club Náutico Posadas",
    images: [{ url: "https://nautico-posadas-web.vercel.app/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://nautico-posadas-web.vercel.app/og.jpg"],
  },
};

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
