import type { Cliente } from "@/lib/types";
import { IconBuilding } from "@/components/portal/PortalShell";
import { CalificacionGoogleCard } from "@/components/portal/PortalResumen";
import SelectorSucursales from "./SelectorSucursales";

// Panel "Sucursales": selector de local dentro de la cuenta — el detalle
// de cada uno (dispositivos, reseñas, evolución mensual) vive en las
// otras pestañas de "Mi Negocio", que ya muestran el local elegido acá.
export default function PanelSucursales({
  sucursalesLength,
  ubicaciones,
  activoId,
  modoTodos,
  codigoAcceso,
  ratingHero,
  resenasHero,
  deltaRatingHero,
  deltaResenasHero,
  activoNombre,
  activoRubro,
  activoZona,
}: {
  sucursalesLength: number;
  ubicaciones: Cliente[];
  activoId: string;
  modoTodos: boolean;
  codigoAcceso: string;
  ratingHero: number | null;
  resenasHero: number;
  deltaRatingHero: number | null;
  deltaResenasHero: number | null;
  activoNombre: string;
  activoRubro: string;
  activoZona: string;
}) {
  if (sucursalesLength === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
        <div className="mx-auto grid h-14 w-14 shrink-0 place-items-center rounded-full border border-slate-200 bg-white">
          <IconBuilding size={22} className="text-slate-400" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800">Todavía no está activo</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Cuando tengas más de un local, vas a poder elegir entre ellos desde acá y ver el
          rating y las reseñas de cada uno por separado. Hoy tu cuenta gestiona un solo local.
        </p>
        <span className="mt-3.5 inline-block rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Próximamente
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Selector compacto: todos los locales, el elegido resaltado —
          elegir uno te lleva directo a su Resumen (con este mismo selector
          arriba, para poder seguir cambiando de local sin volver acá). */}
      <div className="mb-4">
        <SelectorSucursales
          ubicaciones={ubicaciones}
          activoId={activoId}
          modoTodos={modoTodos}
          codigoAcceso={codigoAcceso}
        />
      </div>

      <div className="space-y-4">
        {modoTodos ? (
          <p className="text-sm text-slate-500">
            Estás viendo <b className="text-slate-700">todos tus locales combinados</b> — el resumen
            general está en la pestaña Resumen. Elegí un local acá arriba para ver su rating, sus
            dispositivos y sus reseñas por separado.
          </p>
        ) : (
          <>
            {ratingHero !== null && (
              <CalificacionGoogleCard
                rating={ratingHero}
                totalResenas={resenasHero}
                deltaRating={deltaRatingHero}
                deltaResenas={deltaResenasHero}
                nombre={activoNombre}
                subtitulo={`${activoRubro} · ${activoZona}`}
              />
            )}

            {/* El detalle de este local (dispositivos, reseñas, evolución
                mensual) ya se ve en las otras pestañas de "Mi Negocio" — acá
                solo se elige el local, para no repetir las mismas tarjetas
                dos veces. */}
            <p className="text-xs text-slate-400">
              El resto de las pestañas de Mi Negocio (Dispositivos, Reseñas, Resumen del mes) ya muestran
              el detalle de <b className="text-slate-500">{activoNombre}</b>, el local elegido acá arriba.
            </p>
          </>
        )}
      </div>
    </>
  );
}
