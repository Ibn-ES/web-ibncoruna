/**
 * Los tres valores de "Quiénes somos" (título + texto).
 *
 * Documento "esencia" en Sanity (singleton, _type == "esencia"), campos:
 *   valores   array<{ titulo: string, texto: string }>
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface Valor {
  titulo: string;
  texto: string;
}

interface SanityEsencia {
  valores?: Valor[] | null;
}

export async function getEsencia(): Promise<Valor[]> {
  const local = site.esencia;
  const d = await getSingleton<SanityEsencia>('esencia', `{ valores }`);
  if (!d?.valores?.length) return local;

  return d.valores;
}
