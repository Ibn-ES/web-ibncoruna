/**
 * Trae el único documento de un tipo singleton (p. ej. "domingo", "contacto").
 * Devuelve null si Sanity no está configurado o el documento no existe todavía:
 * en ambos casos, quien llama debe seguir con los valores de site.ts.
 */
import { getSanityClient } from './sanity';

export async function getSingleton<T>(type: string, proyeccion: string): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch<T | null>(`*[_type == "${type}"][0]${proyeccion}`);
}
