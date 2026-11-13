/**
 * Testimonios: vídeos cortos (verticales, tipo reel) o frases.
 *
 * Fuentes, por orden de prioridad:
 *  1. Sanity (SANITY_PROJECT_ID): documentos de tipo "testimonio". El vídeo es
 *     siempre una URL externa (normalmente de Cloudinary).
 *  2. Cloudinary (CLOUDINARY_CLOUD_NAME + CLOUDINARY_TESTIMONIOS_TAG): todos
 *     los vídeos con esa etiqueta; nombre y frase van en su "contextual metadata".
 *  3. Datos de ejemplo.
 *
 * Igual que las prédicas, se leen en el build.
 */

import type { SanityClient } from '@sanity/client';
import { esCloudinary, optimizarVideo, posterDeVideo } from './cloudinary';
import { getSanityClient } from './sanity';

export interface Testimonio {
  id: string;
  tipo: 'video' | 'texto';
  nombre: string;
  detalle?: string;
  texto?: string;
  videoUrl?: string;
  posterUrl?: string;
}

export interface TestimoniosResult {
  testimonios: Testimonio[];
  esEjemplo: boolean;
  fuente: 'sanity' | 'cloudinary' | 'ejemplo';
}

/*
 * Documento "testimonio" en Sanity (campos):
 *   orden       number   orden manual (opcional)
 *   nombre      string
 *   detalle     string   "viene desde 2021"
 *   texto       text     frase corta (obligatoria si no hay vídeo)
 *   videoUrl    url      vídeo, normalmente de Cloudinary
 *   posterUrl   url      imagen de portada (opcional)
 *
 * Solo se piden documentos publicados: a diferencia de Directus, Sanity ya
 * separa los borradores (drafts.*) de lo publicado, así que no hace falta
 * un campo de estado.
 */
interface SanityTestimonio {
  _id: string;
  nombre: string;
  detalle?: string | null;
  texto?: string | null;
  videoUrl?: string | null;
  posterUrl?: string | null;
}

export async function getTestimonios(): Promise<TestimoniosResult> {
  const env = import.meta.env;
  const client = getSanityClient();
  if (client) {
    return { testimonios: await desdeSanity(client), esEjemplo: false, fuente: 'sanity' };
  }
  if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_TESTIMONIOS_TAG) {
    return {
      testimonios: await desdeCloudinary(env.CLOUDINARY_CLOUD_NAME, env.CLOUDINARY_TESTIMONIOS_TAG),
      esEjemplo: false,
      fuente: 'cloudinary',
    };
  }
  return { testimonios: ejemplos(), esEjemplo: true, fuente: 'ejemplo' };
}

/* ----------------------------------------------------------------- Sanity */

async function desdeSanity(client: SanityClient): Promise<Testimonio[]> {
  const docs = await client.fetch<SanityTestimonio[]>(
    `*[_type == "testimonio"] | order(orden asc, _createdAt desc) [0...12] { _id, nombre, detalle, texto, videoUrl, posterUrl }`,
  );

  return docs.map((t): Testimonio => {
    const videoUrl = t.videoUrl ?? undefined;
    const posterUrl = t.posterUrl ?? (videoUrl && esCloudinary(videoUrl) ? posterDeVideo(videoUrl) : undefined);
    return {
      id: t._id,
      tipo: videoUrl ? 'video' : 'texto',
      nombre: t.nombre,
      detalle: t.detalle ?? undefined,
      texto: t.texto ?? undefined,
      videoUrl: videoUrl && esCloudinary(videoUrl) ? optimizarVideo(videoUrl) : videoUrl,
      posterUrl,
    };
  });
}

/* -------------------------------------------------------------- Cloudinary */

interface CloudinaryList {
  resources: {
    public_id: string;
    version: number;
    format: string;
    context?: { custom?: { nombre?: string; detalle?: string; texto?: string } };
  }[];
}

async function desdeCloudinary(cloud: string, tag: string): Promise<Testimonio[]> {
  // Lista pública por etiqueta: no necesita API secret, pero hay que activar
  // "Resource list" en Settings > Security (si no, devuelve 404).
  const res = await fetch(`https://res.cloudinary.com/${cloud}/video/list/${encodeURIComponent(tag)}.json`);
  if (!res.ok) throw new Error(`Cloudinary respondió ${res.status} al listar la etiqueta "${tag}"`);
  const { resources } = (await res.json()) as CloudinaryList;

  return resources.map((r): Testimonio => {
    const base = `https://res.cloudinary.com/${cloud}/video/upload`;
    const meta = r.context?.custom ?? {};
    return {
      id: r.public_id,
      tipo: 'video',
      nombre: meta.nombre ?? '',
      detalle: meta.detalle,
      texto: meta.texto,
      videoUrl: `${base}/q_auto,vc_auto/v${r.version}/${r.public_id}.mp4`,
      posterUrl: `${base}/so_1,c_fill,ar_9:16,w_600,q_auto,f_jpg/v${r.version}/${r.public_id}.jpg`,
    };
  });
}

function ejemplos(): Testimonio[] {
  return [
    { id: 'e1', tipo: 'video', nombre: '[NOMBRE]', detalle: 'viene desde [AÑO]' },
    { id: 'e2', tipo: 'texto', nombre: '[NOMBRE]', detalle: 'viene desde [AÑO]', texto: 'Vine un domingo por curiosidad. Me quedé por la gente.' },
    { id: 'e3', tipo: 'video', nombre: '[NOMBRE]', detalle: '[detalle]' },
    { id: 'e4', tipo: 'texto', nombre: '[NOMBRE]', detalle: '[detalle]', texto: '[Frase corta del testimonio, con sus palabras.]' },
    { id: 'e5', tipo: 'video', nombre: '[NOMBRE]', detalle: '[detalle]' },
  ];
}
