/**
 * Datos del domingo (hora, dirección, qué esperar al llegar).
 *
 * Documento "domingo" en Sanity (singleton, _type == "domingo"), campos:
 *   hora, direccion, direccionCompleta, duracion, ninos, resumen, mapaUrl   string
 *   fotoDestacadaUrl   url   foto real de un domingo, normalmente de Cloudinary
 */
import { site } from '../data/site';
import { optimizarImagenSiCloudinary } from './cloudinary';
import { getSingleton } from './sanitySingleton';

export interface Domingo {
  hora: string;
  direccion: string;
  direccionCompleta: string;
  duracion: string;
  ninos: string;
  resumen: string;
  mapaUrl: string;
  fotoDestacadaUrl?: string;
}

type SanityDomingo = Partial<Record<keyof Omit<Domingo, 'fotoDestacadaUrl'>, string | null>> & {
  fotoDestacadaUrl?: string | null;
};

export async function getDomingo(): Promise<Domingo> {
  const local = site.domingo;
  const d = await getSingleton<SanityDomingo>(
    'domingo',
    `{ hora, direccion, direccionCompleta, duracion, ninos, resumen, mapaUrl, fotoDestacadaUrl }`,
  );
  if (!d) return local;

  return {
    hora: d.hora ?? local.hora,
    direccion: d.direccion ?? local.direccion,
    direccionCompleta: d.direccionCompleta ?? local.direccionCompleta,
    duracion: d.duracion ?? local.duracion,
    ninos: d.ninos ?? local.ninos,
    resumen: d.resumen ?? local.resumen,
    mapaUrl: d.mapaUrl ?? local.mapaUrl,
    fotoDestacadaUrl:
      optimizarImagenSiCloudinary(d.fotoDestacadaUrl ?? undefined, 'w_800') ?? local.fotoDestacadaUrl ?? undefined,
  };
}
