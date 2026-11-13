/**
 * Cliente de Sanity (CMS de portada y testimonios).
 *
 * Opcional: sin SANITY_PROJECT_ID configurado, `getSanityClient()` devuelve
 * `undefined` y `lib/portada.ts` / `lib/testimonios.ts` caen a su siguiente
 * fuente (site.ts, Cloudinary o datos de ejemplo).
 */
import { createClient, type SanityClient } from '@sanity/client';

let client: SanityClient | undefined;

export function getSanityClient(): SanityClient | undefined {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) return undefined;

  client ??= createClient({
    projectId,
    dataset: import.meta.env.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: !import.meta.env.SANITY_TOKEN,
    token: import.meta.env.SANITY_TOKEN || undefined,
  });
  return client;
}
