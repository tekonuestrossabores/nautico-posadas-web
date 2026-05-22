import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Waves, Trophy, Users, Calendar } from "lucide-react";

const DEPORTES: Record<string, {
  nombre: string;
  icon: string;
  color: string;
  descripcionCorta: string;
  descripcionLarga: string;
  datos: { label: string; valor: string }[];
  actividades: string[];
}> = {
  remo: {
    nombre: "Remo",
    icon: "🚣",
    color: "#2B3E9E",
    descripcionCorta: "Una de las disciplinas más tradicionales y exigentes del club, practicada en las aguas del río Paraná.",
    descripcionLarga: `El remo es una de las disciplinas fundacionales del Club Náutico Posadas. Se practica en el río Paraná, aprovechando las condiciones ideales que ofrece el entorno natural de Misiones.

Contamos con equipos de distintas categorías que participan en competencias regionales y nacionales, representando al club con orgullo. El entrenamiento combina la técnica de palada, la resistencia física y el trabajo en equipo.

La escuela de remo recibe a principiantes de todas las edades, con instructores especializados que guían el aprendizaje desde los primeros pasos hasta la competencia.`,
    datos: [
      { label: "Categorías", valor: "Infantil, Junior, Mayor, Veterano" },
      { label: "Modalidades", valor: "Scull, Sweep" },
      { label: "Embarcaciones", valor: "1x, 2x, 4x, 8+" },
      { label: "Entrenamiento", valor: "Lunes a sábados" },
    ],
    actividades: [
      "Clases de iniciación al remo",
      "Entrenamiento para competencia",
      "Regatas regionales y nacionales",
      "Salidas en grupo por el Paraná",
    ],
  },
  "vela-ligera": {
    nombre: "Vela Ligera",
    icon: "⛵",
    color: "#E87722",
    descripcionCorta: "Navegación a vela con embarcaciones pequeñas y ágiles. Actividad para todas las edades con escuela de iniciación.",
    descripcionLarga: `La vela ligera es la puerta de entrada al mundo náutico para muchos socios del club. Con clases optimist para los más chicos y laser para los adultos, el aprendizaje es progresivo y siempre bajo la supervisión de instructores certificados.

El río Paraná ofrece condiciones variables de viento que convierten cada salida en una experiencia única. Desde la primera vez que alguien toca el timón hasta que compite en una regata oficial, el camino es apasionante.

El club organiza clínicas de perfeccionamiento técnico y participa activamente en el circuito regional de vela ligera.`,
    datos: [
      { label: "Clases", valor: "Optimist, Laser, 420" },
      { label: "Edad mínima", valor: "5 años" },
      { label: "Nivel", valor: "Principiante a competitivo" },
      { label: "Temporada", valor: "Todo el año" },
    ],
    actividades: [
      "Escuela de vela para niños (Optimist)",
      "Clases para adultos principiantes",
      "Perfeccionamiento y competencia",
      "Regatas internas y externas",
    ],
  },
  cabinados: {
    nombre: "Cabinados",
    icon: "🛥️",
    color: "#2E8B3A",
    descripcionCorta: "Navegación a vela con embarcaciones de cabina. Regatas offshore y cruceros por el Paraná.",
    descripcionLarga: `Los cabinados representan la vela de altura en el Club Náutico Posadas. Con embarcaciones equipadas con cabina, se realizan navegaciones de mayor duración, travesías y regatas offshore en el río Paraná.

Esta disciplina requiere conocimientos técnicos más avanzados: meteorología, navegación nocturna, maniobras de fondeo y comunicaciones. Por eso el club organiza cursos de capacitación permanente para los tripulantes.

Las regatas de cabinados son eventos sociales importantes del club, que reúnen a familias y amigos en torno a la pasión compartida por la vela.`,
    datos: [
      { label: "Tipo de embarcaciones", valor: "Monocascos de cabina" },
      { label: "Modalidades", valor: "Regatas, cruceros, travesías" },
      { label: "Zona de navegación", valor: "Río Paraná" },
      { label: "Requisito", valor: "Libreta de marinero" },
    ],
    actividades: [
      "Regatas offshore en el Paraná",
      "Cruceros y travesías grupales",
      "Cursos de navegación a vela",
      "Actividades sociales a bordo",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(DEPORTES).map((slug) => ({ deporte: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ deporte: string }> }) {
  const { deporte } = await params;
  const d = DEPORTES[deporte];
  if (!d) return { title: "Deporte no encontrado" };
  return {
    title: `${d.nombre} | Club Náutico Posadas`,
    description: d.descripcionCorta,
  };
}

export default async function DeportePage({ params }: { params: Promise<{ deporte: string }> }) {
  const { deporte } = await params;
  const d = DEPORTES[deporte];
  if (!d) notFound();

  const otrosDeportes = Object.entries(DEPORTES).filter(([slug]) => slug !== deporte);

  return (
    <div>
      {/* Hero de deporte */}
      <div
        className="relative py-20 px-4 text-white"
        style={{ background: `linear-gradient(135deg, #1e2d5a 0%, ${d.color} 100%)` }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/#deportes" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            ← Volver a deportes
          </Link>
          <div className="text-6xl mb-4">{d.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{d.nombre}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{d.descripcionCorta}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Descripción */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1e2d5a] mb-4">Sobre la disciplina</h2>
              <div className="space-y-3">
                {d.descripcionLarga.split("\n\n").map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1e2d5a] mb-4">Actividades</h2>
              <ul className="space-y-2">
                {d.actividades.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#1e2d5a] text-lg mb-2">¿Querés sumarte?</h3>
              <p className="text-gray-500 text-sm mb-4">
                Contactanos o ingresá al portal de socios para más información.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="bg-[#E87722] hover:bg-[#d06810] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
                >
                  Acceso Socios
                </Link>
                <Link
                  href="/#contacto"
                  className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar con datos */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-2" style={{ backgroundColor: d.color }} />
              <div className="p-5 space-y-4">
                {d.datos.map((dato, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      {dato.label}
                    </p>
                    <p className="text-sm font-medium text-[#1e2d5a]">{dato.valor}</p>
                    {i < d.datos.length - 1 && <div className="border-b border-gray-50 mt-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Otras disciplinas */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Otras disciplinas
              </h4>
              <div className="space-y-2">
                {otrosDeportes.map(([slug, od]) => (
                  <Link
                    key={slug}
                    href={`/deportes/${slug}`}
                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <span className="text-xl">{od.icon}</span>
                    <span className="font-medium text-gray-700 text-sm">{od.nombre}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
