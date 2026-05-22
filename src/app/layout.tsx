import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PublicNavbar } from "@/components/public/public-navbar";
import { PublicFooter } from "@/components/public/public-footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Club Náutico Posadas",
  description: "Institución náutica y deportiva de la ciudad de Posadas, Misiones.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
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
