/**
 * Datos del grupo de jóvenes.
 *
 * Documento "jovenes" en Sanity (singleton, _type == "jovenes"), campos:
 *   nombre, cuando, instagram   string
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface Jovenes {
  nombre: string;
  cuando: string;
  instagram: string;
}

type SanityJovenes = Partial<Record<keyof Jovenes, string | null>>;

export async function getJovenes(): Promise<Jovenes> {
  const local = site.jovenes;
  const d = await getSingleton<SanityJovenes>('jovenes', `{ nombre, cuando, instagram }`);
  if (!d) return local;

  return {
    nombre: d.nombre ?? local.nombre,
    cuando: d.cuando ?? local.cuando,
    instagram: d.instagram ?? local.instagram,
  };
}
