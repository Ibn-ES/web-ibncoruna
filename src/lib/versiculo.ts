/**
 * Versículo destacado entre las secciones de la portada.
 *
 * Documento "versiculo" en Sanity (singleton, _type == "versiculo"), campos:
 *   texto, cita   string
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface Versiculo {
  texto: string;
  cita: string;
}

type SanityVersiculo = Partial<Record<keyof Versiculo, string | null>>;

export async function getVersiculo(): Promise<Versiculo> {
  const local = site.versiculo;
  const d = await getSingleton<SanityVersiculo>('versiculo', `{ texto, cita }`);
  if (!d) return local;

  return {
    texto: d.texto ?? local.texto,
    cita: d.cita ?? local.cita,
  };
}
