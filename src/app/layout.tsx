import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PublicNavbar } from "@/components/public/public-navbar";
import { PublicFooter } from "@/components/public/public-footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Club Náutico Posadas",
  description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
  openGraph: {
    title: "Club Náutico Posadas",
    description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
    url: "https://nautico-posadas-web.vercel.app",
    siteName: "Club Náutico Posadas",
    images: [{ url: "https://nautico-posadas-web.vercel.app/opengraph-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Náutico Posadas",
    description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
    images: ["https://nautico-posadas-web.vercel.app/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white">
        <PublicNavbar />
        <main className="flex-1 pt-16">{children}</main>
        <PublicFooter />
      </body>
    </html>
  );
}
