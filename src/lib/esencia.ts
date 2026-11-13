/**
 * Los tres valores de "Quiénes somos" (título + texto).
 *
 * Documento "esencia" en Sanity (singleton, _type == "esencia"), campos:
 *   valores   array<{ titulo, texto, tituloGl?, textoGl? }>
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
import { getSingleton } from './sanitySingleton';

export interface Valor {
  titulo: string;
  texto: string;
}

interface SanityValor {
  titulo: string;
  texto: string;
  tituloGl?: string | null;
  textoGl?: string | null;
}

interface SanityEsencia {
  valores?: SanityValor[] | null;
}

export async function getEsencia(locale?: string): Promise<Valor[]> {
  const gl = esLocale(locale) === 'gl';
  const local = site.esencia;
  const d = await getSingleton<SanityEsencia>('esencia', `{ valores }`);
  if (!d?.valores?.length) return local;

  return d.valores.map((v) => ({
    titulo: (gl && v.tituloGl) || v.titulo,
    texto: (gl && v.textoGl) || v.texto,
  }));
}
