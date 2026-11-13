/**
 * Lema de la iglesia (titular del hero, pie de página y banda de frases).
 *
 * Documento "lema" en Sanity (singleton, _type == "lema"), campos:
 *   principal      string
 *   secundario     string
 *   alternativos   array<string>
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface Lema {
  principal: string;
  secundario: string;
  alternativos: string[];
}

interface SanityLema {
  principal?: string | null;
  secundario?: string | null;
  alternativos?: string[] | null;
}

export async function getLema(): Promise<Lema> {
  const local = site.lema;
  const d = await getSingleton<SanityLema>('lema', `{ principal, secundario, alternativos }`);
  if (!d) return local;

  return {
    principal: d.principal ?? local.principal,
    secundario: d.secundario ?? local.secundario,
    alternativos: d.alternativos?.length ? d.alternativos : local.alternativos,
  };
}
