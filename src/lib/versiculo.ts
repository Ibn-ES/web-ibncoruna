/**
 * Versículo destacado entre las secciones de la portada.
 *
 * Documento "versiculo" en Sanity (singleton, _type == "versiculo"), campos:
 *   texto, cita   string
 *   textoGl, citaGl   string (versión en gallego)
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
import { getSingleton } from './sanitySingleton';

export interface Versiculo {
  texto: string;
  cita: string;
}

interface SanityVersiculo {
  texto?: string | null;
  cita?: string | null;
  textoGl?: string | null;
  citaGl?: string | null;
}

export async function getVersiculo(locale?: string): Promise<Versiculo> {
  const gl = esLocale(locale) === 'gl';
  const local = site.versiculo;
  const d = await getSingleton<SanityVersiculo>('versiculo', `{ texto, cita, textoGl, citaGl }`);
  if (!d) return local;

  return {
    texto: (gl && d.textoGl) || d.texto || local.texto,
    cita: (gl && d.citaGl) || d.cita || local.cita,
  };
}
