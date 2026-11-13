/**
 * Política de privacidad.
 *
 * Documento "privacidad" en Sanity (singleton, _type == "privacidad"), campos:
 *   titulo               string
 *   secciones            array<{ titulo, texto, tituloGl?, textoGl? }>
 *   tituloGl             string (versión en gallego)
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
import { getSingleton } from './sanitySingleton';
import type { Legal, Seccion } from './legal';

export type { Seccion };
export type Privacidad = Legal;

interface SanitySeccion {
  titulo: string;
  texto: string;
  tituloGl?: string | null;
  textoGl?: string | null;
}

interface SanityPrivacidad {
  titulo?: string | null;
  tituloGl?: string | null;
  secciones?: SanitySeccion[] | null;
}

export async function getPrivacidad(locale?: string): Promise<Privacidad> {
  const gl = esLocale(locale) === 'gl';
  const local = site.privacidad;
  const d = await getSingleton<SanityPrivacidad>('privacidad', `{ titulo, tituloGl, secciones }`);
  if (!d?.secciones?.length) return local;

  return {
    titulo: (gl && d.tituloGl) || d.titulo || local.titulo,
    secciones: d.secciones.map((s) => ({
      titulo: (gl && s.tituloGl) || s.titulo,
      texto: (gl && s.textoGl) || s.texto,
    })),
  };
}
