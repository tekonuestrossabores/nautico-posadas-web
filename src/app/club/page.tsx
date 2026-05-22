"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClubPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/"); }, [router]);
  return (
    <div className="min-h-screen bg-[#1e2d5a] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-white/60">Cargando...</p>
      </div>
    </div>
  );
}
