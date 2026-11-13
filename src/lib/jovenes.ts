/**
 * Datos del grupo de jóvenes.
 *
 * Documento "jovenes" en Sanity (singleton, _type == "jovenes"), campos:
 *   nombre, cuando, instagram   string
 *   nombreGl, cuandoGl          string (versión en gallego; instagram no se traduce)
 */
import { site } from '../data/site';
import { esLocale } from '../i18n/ui';
import { getSingleton } from './sanitySingleton';

export interface Jovenes {
  nombre: string;
  cuando: string;
  instagram: string;
}

interface SanityJovenes {
  nombre?: string | null;
  cuando?: string | null;
  instagram?: string | null;
  nombreGl?: string | null;
  cuandoGl?: string | null;
}

export async function getJovenes(locale?: string): Promise<Jovenes> {
  const gl = esLocale(locale) === 'gl';
  const local = site.jovenes;
  const d = await getSingleton<SanityJovenes>('jovenes', `{ nombre, cuando, instagram, nombreGl, cuandoGl }`);
  if (!d) return local;

  return {
    nombre: (gl && d.nombreGl) || d.nombre || local.nombre,
    cuando: (gl && d.cuandoGl) || d.cuando || local.cuando,
    instagram: d.instagram?.trim() || local.instagram,
  };
}
