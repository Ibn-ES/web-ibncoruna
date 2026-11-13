/**
 * Enlaces del botón "Seguir en Spotify" / "Apple Podcasts" (no confundir con
 * lib/predicas.ts, que trae los episodios por RSS).
 *
 * Documento "predicasEnlaces" en Sanity (singleton, _type == "predicasEnlaces"), campos:
 *   spotifyUrl, applePodcastsUrl   string
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface PredicasEnlaces {
  spotifyUrl: string;
  applePodcastsUrl: string;
}

type SanityPredicasEnlaces = Partial<Record<keyof PredicasEnlaces, string | null>>;

export async function getPredicasEnlaces(_locale?: string): Promise<PredicasEnlaces> {
  const local = site.predicas;
  const d = await getSingleton<SanityPredicasEnlaces>('predicasEnlaces', `{ spotifyUrl, applePodcastsUrl }`);
  if (!d) return local;

  return {
    spotifyUrl: d.spotifyUrl ?? local.spotifyUrl,
    applePodcastsUrl: d.applePodcastsUrl ?? local.applePodcastsUrl,
  };
}
