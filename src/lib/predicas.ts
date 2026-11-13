/**
 * Prédicas desde el RSS del podcast (Spotify for Creators).
 *
 * Se lee en tiempo de build: Astro genera HTML estático con los episodios.
 * Para que aparezca una prédica nueva hay que reconstruir la web
 * (un cron semanal el domingo por la noche es suficiente, ver README).
 *
 * ¿Por qué RSS y no la API de Spotify?
 *  - Es público: no hace falta registrar una app ni guardar secretos.
 *  - Trae el MP3 de cada episodio, así que podemos reproducirlo en la propia web.
 */
import { XMLParser } from 'fast-xml-parser';

export interface Predica {
  id: string;
  titulo: string;
  fecha: Date;
  /** "42 min" */
  duracion?: string;
  descripcion: string;
  imagen?: string;
  audioUrl?: string;
  /** Página del episodio (Spotify) */
  enlace?: string;
}

export interface PredicasResult {
  predicas: Predica[];
  esEjemplo: boolean;
}

let cache: Promise<PredicasResult> | undefined;

/** Se llama desde varias páginas; el feed solo se descarga una vez por build. */
export function getPredicas(): Promise<PredicasResult> {
  cache ??= load();
  return cache;
}

async function load(): Promise<PredicasResult> {
  const url = import.meta.env.SPOTIFY_RSS_URL;
  if (!url) return { predicas: ejemplos(), esEjemplo: true };

  // Si el feed está configurado pero falla, el build falla a propósito:
  // es mejor mantener la versión publicada que publicar una web sin prédicas.
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo leer el RSS de prédicas (${res.status}): ${url}`);
  return { predicas: parseRss(await res.text()), esEjemplo: false };
}

/** Forma de un <item> tal como lo deja fast-xml-parser (solo los campos que usamos). */
interface RssItem {
  guid?: string | { '#text'?: string };
  title?: string;
  pubDate?: string;
  link?: string;
  'itunes:duration'?: string | number;
  'itunes:summary'?: string;
  description?: string;
  'itunes:image'?: { '@_href'?: string };
  enclosure?: { '@_url'?: string };
}

export function parseRss(xml: string): Predica[] {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel) return [];

  const showImage: string | undefined = channel['itunes:image']?.['@_href'] ?? channel.image?.url;
  const items = [channel.item ?? []].flat();

  return items
    .map((it: RssItem): Predica => ({
      id: String(it.guid?.['#text'] ?? it.guid ?? it.link ?? it.title),
      titulo: String(it.title ?? '').trim(),
      fecha: new Date(it.pubDate),
      duracion: formatDuracion(it['itunes:duration']),
      descripcion: limpiarHtml(String(it['itunes:summary'] ?? it.description ?? '')),
      imagen: it['itunes:image']?.['@_href'] ?? showImage,
      audioUrl: it.enclosure?.['@_url'],
      enlace: it.link,
    }))
    .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
}

/** itunes:duration puede venir en segundos ("2534") o como "hh:mm:ss". */
function formatDuracion(raw: unknown): string | undefined {
  if (raw == null || raw === '') return undefined;
  const parts = String(raw).split(':').map(Number);
  const secs = parts.reduce((acc, n) => acc * 60 + n, 0);
  if (!Number.isFinite(secs) || secs <= 0) return undefined;
  const min = Math.round(secs / 60);
  return min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`;
}

function limpiarHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function formatFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(fecha);
}

/** Datos de ejemplo mientras no haya RSS configurado. */
function ejemplos(): Predica[] {
  const domingo = (semanasAtras: number) => {
    const d = new Date('2026-11-09T11:00:00');
    d.setDate(d.getDate() - semanasAtras * 7);
    return d;
  };
  return Array.from({ length: 8 }, (_, i) => ({
    id: `ejemplo-${i}`,
    titulo: '[Título de la prédica]',
    fecha: domingo(i),
    duracion: `${38 + ((i * 7) % 12)} min`,
    descripcion: '[Resumen de una o dos frases de la prédica, tal como aparece en Spotify.]',
  }));
}
