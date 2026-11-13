/**
 * Aviso legal.
 *
 * Documento "legal" en Sanity (singleton, _type == "legal"), campos:
 *   titulo               string
 *   secciones            array<{ titulo, texto, tituloGl?, textoGl? }>
 *   tituloGl             string (versión en gallego)
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
import { getSingleton } from './sanitySingleton';

export interface Seccion {
  titulo: string;
  texto: string;
}

export interface Legal {
  titulo: string;
  secciones: Seccion[];
}

interface SanitySeccion {
  titulo: string;
  texto: string;
  tituloGl?: string | null;
  textoGl?: string | null;
}

interface SanityLegal {
  titulo?: string | null;
  tituloGl?: string | null;
  secciones?: SanitySeccion[] | null;
}

export async function getLegal(locale?: string): Promise<Legal> {
  const gl = esLocale(locale) === 'gl';
  const local = site.legal;
  const d = await getSingleton<SanityLegal>('legal', `{ titulo, tituloGl, secciones }`);
  if (!d?.secciones?.length) return local;

  return {
    titulo: (gl && d.tituloGl) || d.titulo || local.titulo,
    secciones: d.secciones.map((s) => ({
      titulo: (gl && s.tituloGl) || s.titulo,
      texto: (gl && s.textoGl) || s.texto,
    })),
  };
}
