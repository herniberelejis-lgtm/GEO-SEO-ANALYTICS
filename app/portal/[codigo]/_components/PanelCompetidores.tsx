import type { BenchmarkMes, Competidor } from "@/lib/types";
import { fmtNum } from "@/lib/format";
import BenchmarkCompetencia, { type CrecimientoVsCompetencia } from "@/components/BenchmarkCompetencia";

// Panel "Competidores": foto EN VIVO de cómo está parado el local frente a
// la competencia de su zona — "Tu local" siempre va primero, arriba de la
// lista, con el dato de ahora mismo (no el de la última foto congelada del
// mes). Los competidores se sincronizan contra Google Places cuando el
// cliente entra a ver esta pestaña (ver sincronizarCompetidoresDeComercio en
// page.tsx), no solo una vez por día vía cron. Debajo, si ya hay al menos
// dos fotos mensuales congeladas, se agrega el benchmarking histórico
// (BenchmarkCompetencia) para ver la evolución mes a mes.
export default function PanelCompetidores({
  competidores,
  nombreLocal,
  ratingLocal,
  resenasLocal,
  posicion,
  benchmark,
  crecimientoVsCompetencia,
}: {
  competidores: Competidor[];
  nombreLocal: string;
  ratingLocal: number | null;
  resenasLocal: number;
  posicion: { puesto: number; total: number } | null;
  benchmark: BenchmarkMes[];
  crecimientoVsCompetencia: CrecimientoVsCompetencia | null;
}) {
  const filasCompetencia = [...competidores].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <>
      <p className="mb-4 text-sm text-slate-500">
        Cómo estás parado frente a los locales de tu zona, ahora mismo — se sincroniza solo cuando entrás a ver.
      </p>

      {competidores.length > 0 ? (
        <div className="mb-4 overflow-hidden rounded-3xl border border-white/60 bg-white/65 shadow-[0_8px_30px_-14px_rgba(17,17,17,0.14)] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Ficha</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Reseñas</th>
                  <th className="px-4 py-3 font-medium">Posición</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 bg-brand/5">
                  <td className="px-4 py-3 font-semibold text-brand-fg">{nombreLocal} (vos)</td>
                  <td className="px-4 py-3 tabular-nums font-medium text-slate-800">
                    {ratingLocal === null ? "—" : ratingLocal.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-medium text-slate-800">{fmtNum(resenasLocal)}</td>
                  <td className="px-4 py-3 tabular-nums font-semibold text-slate-800">
                    {posicion ? `#${posicion.puesto} de ${posicion.total}` : "—"}
                  </td>
                </tr>
                {filasCompetencia.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 text-slate-600 last:border-0">
                    <td className="px-4 py-3">{c.nombre}</td>
                    <td className="px-4 py-3 tabular-nums">{c.rating === null ? "—" : c.rating.toFixed(1)}</td>
                    <td className="px-4 py-3 tabular-nums">{c.totalResenas === null ? "—" : fmtNum(c.totalResenas)}</td>
                    <td className="px-4 py-3 tabular-nums text-slate-400">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mb-4 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-sm text-slate-500">
          Todavía no cargamos competidores con Place ID para tu zona — pedile a tu contacto en MetricsField que los
          agregue desde el panel para ver esta comparación.
        </p>
      )}

      {benchmark.length > 0 && (
        <BenchmarkCompetencia meses={benchmark} crecimiento={crecimientoVsCompetencia} />
      )}
    </>
  );
}
