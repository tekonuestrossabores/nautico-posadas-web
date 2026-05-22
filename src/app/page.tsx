import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Anchor, Trophy, Calendar, ChevronRight } from "lucide-react";

const DEPORTES = [
  {
    slug: "remo",
    nombre: "Remo",
    descripcion: "Una de las disciplinas más tradicionales del club. Entrenamos en el río Paraná con embarcaciones de remo clásico y competimos a nivel regional y nacional.",
    icon: "🚣",
    color: "#2B3E9E",
  },
  {
    slug: "vela-ligera",
    nombre: "Vela Ligera",
    descripcion: "Navegamos con optimist, laser y otras clases de vela ligera. Actividad para todas las edades con escuela de iniciación para niños y jóvenes.",
    icon: "⛵",
    color: "#E87722",
  },
  {
    slug: "cabinados",
    nombre: "Cabinados",
    descripcion: "Navegación a vela con embarcaciones de cabina. Regatas offshore y costeras en el Paraná y actividades de turismo náutico.",
    icon: "🛥️",
    color: "#2E8B3A",
  },
];

export default async function HomePage() {
  const hoy = new Date().toISOString().split("T")[0];
  const { data: proximasRegatas } = await supabase
    .from("eventos")
    .select("id, nombre, fecha_inicio, lugar")
    .gte("fecha_inicio", hoy)
    .order("fecha_inicio", { ascending: true })
    .limit(3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#1e2d5a] overflow-hidden">
        {/* Foto de fondo */}
        <Image
          src="/hero.jpg"
          alt="Club Náutico Posadas"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-[#1e2d5a]/60" />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <Image
            src="/logo.jpg"
            alt="Club Náutico Posadas"
            width={130}
            height={130}
            className="mx-auto mb-6 rounded-full shadow-2xl ring-4 ring-white/20"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Club Náutico<br />
            <span className="text-[#E87722]">Posadas</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Pasión por el río, tradición náutica y deporte en el corazón de Misiones.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/calendario"
              className="bg-[#E87722] hover:bg-[#d06810] text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Ver Regatas
            </Link>
            <a
              href="https://nautico-posadas.vercel.app/login"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Anchor className="w-5 h-5" />
              Acceso Socios
            </a>
          </div>
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#E87722] font-semibold text-sm uppercase tracking-widest">
              Nuestra historia
            </span>
            <h2 className="text-3xl font-bold text-[#1e2d5a] mt-2 mb-4">
              Una institución con vocación náutica
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              El Club Náutico Posadas nació de la pasión de un grupo de amigos por el río Paraná y
              los deportes acuáticos. Con los años se consolidó como la principal institución náutica
              de la ciudad de Posadas, Misiones.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Fomentamos el deporte, la amistad y el amor por el río en un ambiente familiar y
              comprometido con la comunidad misionera.
            </p>
            <Link
              href="/#deportes"
              className="inline-flex items-center gap-1 text-[#E87722] font-semibold hover:gap-2 transition-all"
            >
              Conocé nuestras actividades <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/club.jpg"
                alt="Marina del Club Náutico Posadas"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#E87722]/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-[#2E8B3A]/20 -z-10" />
          </div>
        </div>
      </section>

      {/* DEPORTES */}
      <section id="deportes" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E87722] font-semibold text-sm uppercase tracking-widest">Actividades</span>
            <h2 className="text-3xl font-bold text-[#1e2d5a] mt-2">Nuestras disciplinas</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DEPORTES.map((d) => (
              <Link
                key={d.slug}
                href={`/deportes/${d.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100"
              >
                <div className="h-2 w-full" style={{ backgroundColor: d.color }} />
                <div className="p-6">
                  <div className="text-4xl mb-3">{d.icon}</div>
                  <h3 className="text-xl font-bold text-[#1e2d5a] mb-2 group-hover:text-[#E87722] transition-colors">{d.nombre}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{d.descripcion}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: d.color }}>
                    Ver más <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMAS REGATAS */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#E87722] font-semibold text-sm uppercase tracking-widest">Calendario</span>
            <h2 className="text-3xl font-bold text-[#1e2d5a] mt-2">Próximas regatas</h2>
          </div>
          <Link href="/calendario" className="inline-flex items-center gap-1 text-[#1e2d5a] font-semibold hover:text-[#E87722] transition-colors text-sm">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {!proximasRegatas || proximasRegatas.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-400">No hay regatas programadas próximamente</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {(proximasRegatas as any[]).map((r) => {
              const fecha = new Date(r.fecha_inicio + "T12:00:00").toLocaleDateString("es-AR", {
                weekday: "long", day: "numeric", month: "long",
              });
              return (
                <div key={r.id} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#1e2d5a] flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-[#E87722]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e2d5a]">{r.nombre}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{fecha}</span>
                        {r.lugar && <span>{r.lugar}</span>}
                      </div>
                    </div>
                  </div>
                  <Link href="/calendario" className="shrink-0 text-sm font-semibold text-[#E87722] hover:underline flex items-center gap-1">
                    Ver más <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA SOCIOS */}
      <section className="bg-[#1e2d5a] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">¿Ya sos socio?</h2>
          <p className="text-white/60 mb-8">Accedé a la plataforma del club para gestionar tu perfil, reservas y mucho más.</p>
          <a
            href="https://nautico-posadas.vercel.app/login"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#E87722] hover:bg-[#d06810] text-white font-bold px-10 py-3 rounded-xl transition-colors"
          >
            <Anchor className="w-5 h-5" />
            Ingresar al portal
          </a>
        </div>
      </section>
    </>
  );
}
