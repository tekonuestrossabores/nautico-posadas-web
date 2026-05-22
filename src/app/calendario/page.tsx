import { supabase } from "@/lib/supabase";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";

export const metadata = {
  title: "Calendario de Regatas | Club Náutico Posadas",
  description: "Calendario de regatas y eventos náuticos del Club Náutico Posadas.",
};

function formatFechaLarga(fecha: string) {
  return new Date(fecha + "T12:00:00").toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default async function CalendarioPage() {
  const hoy = new Date().toISOString().split("T")[0];

  const { data: proximas } = await supabase
    .from("eventos")
    .select("id, nombre, fecha_inicio, fecha_fin, lugar, descripcion")
    .gte("fecha_inicio", hoy)
    .order("fecha_inicio", { ascending: true });

  const { data: pasadas } = await supabase
    .from("eventos")
    .select("id, nombre, fecha_inicio, fecha_fin, lugar")
    .lt("fecha_inicio", hoy)
    .order("fecha_inicio", { ascending: false })
    .limit(5);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <span className="text-[#E87722] font-semibold text-sm uppercase tracking-widest">
          Calendario náutico
        </span>
        <h1 className="text-4xl font-bold text-[#1e2d5a] mt-2 mb-3">Regatas y Eventos</h1>
        <p className="text-gray-500">
          Competencias y actividades náuticas del Club Náutico Posadas.
        </p>
      </div>

      {/* Próximas */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-[#1e2d5a] mb-5 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#E87722]" />
          Próximas regatas
        </h2>

        {!proximas || proximas.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-400 font-medium">No hay regatas programadas próximamente</p>
            <p className="text-gray-400 text-sm mt-1">Volvé a consultar más adelante</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {(proximas as any[]).map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#1e2d5a] to-[#2B3E9E]" />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#1e2d5a] mb-2">{r.nombre}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#E87722]" />
                          {formatFechaLarga(r.fecha_inicio)}
                          {r.fecha_fin && r.fecha_fin !== r.fecha_inicio && (
                            <> — {formatFechaLarga(r.fecha_fin)}</>
                          )}
                        </span>
                        {r.lugar && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#E87722]" />
                            {r.lugar}
                          </span>
                        )}
                      </div>
                      {r.descripcion && (
                        <p className="text-gray-600 text-sm leading-relaxed">{r.descripcion}</p>
                      )}
                    </div>
                    <a
                      href="https://nautico-posadas.vercel.app/login"
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 bg-[#E87722] hover:bg-[#d06810] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <Users className="w-4 h-4" />
                      Inscribirse
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {pasadas && pasadas.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#1e2d5a] mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            Regatas anteriores
          </h2>
          <div className="grid gap-3">
            {(pasadas as any[]).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4 border border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-700">{r.nombre}</p>
                  <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatFechaLarga(r.fecha_inicio)}
                    {r.lugar && <> · {r.lugar}</>}
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
                  Finalizada
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
