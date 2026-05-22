"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/#deportes", label: "Deportes" },
    { href: "/calendario", label: "Regatas" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e2d5a]/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Club Náutico Posadas" width={40} height={40} className="rounded-full" />
          <span className="text-white font-semibold text-lg hidden sm:block leading-tight">
            Club Náutico<br />
            <span className="text-[#E87722] font-bold">Posadas</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://nautico-posadas.vercel.app/login" target="_blank" rel="noreferrer"
            className="ml-2 bg-[#E87722] hover:bg-[#d06810] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Acceso Socios
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1e2d5a] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-medium py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://nautico-posadas.vercel.app/login" target="_blank" rel="noreferrer"
            className="bg-[#E87722] hover:bg-[#d06810] text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-1 transition-colors"
            onClick={() => setOpen(false)}
          >
            Acceso Socios
          </Link>
        </div>
      )}
    </header>
  );
}
