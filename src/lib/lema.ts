/**
 * Lema de la iglesia (titular del hero, pie de página y banda de frases).
 *
 * Documento "lema" en Sanity (singleton, _type == "lema"), campos:
 *   principal, principalGl      string
 *   secundario, secundarioGl    string
 *   alternativos, alternativosGl   array<string>
 * Los campos "Gl" son la versión en gallego; vacíos, se usa el español.
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
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
  principalGl?: string | null;
  secundarioGl?: string | null;
  alternativosGl?: string[] | null;
}

export async function getLema(locale?: string): Promise<Lema> {
  const gl = esLocale(locale) === 'gl';
  const local = site.lema;
  const d = await getSingleton<SanityLema>(
    'lema',
    `{ principal, secundario, alternativos, principalGl, secundarioGl, alternativosGl }`,
  );
  if (!d) return local;

  return {
    principal: (gl && d.principalGl) || d.principal || local.principal,
    secundario: (gl && d.secundarioGl) || d.secundario || local.secundario,
    alternativos: (gl && d.alternativosGl?.length ? d.alternativosGl : d.alternativos?.length ? d.alternativos : local.alternativos),
  };
}
