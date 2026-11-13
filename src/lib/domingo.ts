/**
 * Datos del domingo (hora, dirección, qué esperar al llegar).
 *
 * Documento "domingo" en Sanity (singleton, _type == "domingo"), campos:
 *   hora, mapaUrl, fotoDestacadaUrl   string/url (no se traducen)
 *   direccion, direccionCompleta, duracion, ninos, resumen   string
 *   direccionGl, direccionCompletaGl, duracionGl, ninosGl, resumenGl   string (versión en gallego)
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
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

interface SanityDomingo {
  hora?: string | null;
  direccion?: string | null;
  direccionCompleta?: string | null;
  duracion?: string | null;
  ninos?: string | null;
  resumen?: string | null;
  mapaUrl?: string | null;
  fotoDestacadaUrl?: string | null;
  direccionGl?: string | null;
  direccionCompletaGl?: string | null;
  duracionGl?: string | null;
  ninosGl?: string | null;
  resumenGl?: string | null;
}

export async function getDomingo(locale?: string): Promise<Domingo> {
  const gl = esLocale(locale) === 'gl';
  const local = site.domingo;
  const d = await getSingleton<SanityDomingo>(
    'domingo',
    `{ hora, direccion, direccionCompleta, duracion, ninos, resumen, mapaUrl, fotoDestacadaUrl, direccionGl, direccionCompletaGl, duracionGl, ninosGl, resumenGl }`,
  );
  if (!d) return local;

  return {
    hora: d.hora?.trim() || local.hora,
    direccion: (gl && d.direccionGl?.trim()) || d.direccion?.trim() || local.direccion,
    direccionCompleta: (gl && d.direccionCompletaGl?.trim()) || d.direccionCompleta?.trim() || local.direccionCompleta,
    duracion: (gl && d.duracionGl?.trim()) || d.duracion?.trim() || local.duracion,
    ninos: (gl && d.ninosGl?.trim()) || d.ninos?.trim() || local.ninos,
    resumen: (gl && d.resumenGl?.trim()) || d.resumen?.trim() || local.resumen,
    mapaUrl: d.mapaUrl?.trim() || local.mapaUrl,
    fotoDestacadaUrl:
      optimizarImagenSiCloudinary(d.fotoDestacadaUrl ?? undefined, 'w_800') ?? local.fotoDestacadaUrl ?? undefined,
  };
}
