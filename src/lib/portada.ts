/**
 * Configuración del hero: fondo (foto / vídeo) y tarjeta de promoción.
 *
 * Por defecto sale de site.ts. Si hay Sanity y existe el documento "portada",
 * sus valores mandan: así se cambia la campaña desde el panel, sin tocar código.
 *
 * Documento "portada" en Sanity (singleton, _type == "portada"), campos:
 *   fondoImagenUrl   url      foto de fondo, normalmente de Cloudinary
 *   fondoVideoUrl    url      vídeo en bucle, sin sonido, normalmente de Cloudinary
 *   dosTonos         boolean  ciudad/mar = true · personas = false
 *   promoActiva      boolean
 *   promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto   string
 */
import { site, type Promo } from '../data/site';
import { esCloudinary, optimizarImagen, optimizarVideo } from './cloudinary';
import { getSanityClient } from './sanity';

export interface Portada {
  fondo: { imagen?: string; video?: string; dosTonos: boolean };
  promo: Promo | null;
}

interface SanityPortada {
  fondoImagenUrl?: string | null;
  fondoVideoUrl?: string | null;
  dosTonos?: boolean | null;
  promoActiva?: boolean | null;
  promoEtiqueta?: string | null;
  promoTitulo?: string | null;
  promoTexto?: string | null;
  promoEnlace?: string | null;
  promoEnlaceTexto?: string | null;
}

export async function getPortada(): Promise<Portada> {
  const local: Portada = {
    fondo: {
      imagen: optimizarSiCloudinary(site.hero.fondo.imagen, 'imagen'),
      video: optimizarSiCloudinary(site.hero.fondo.video, 'video'),
      dosTonos: site.hero.fondo.dosTonos,
    },
    promo: site.hero.promo,
  };

  const client = getSanityClient();
  if (!client) return local;

  // El singleton es opcional: si no existe todavía, seguimos con site.ts.
  const d = await client.fetch<SanityPortada | null>(
    `*[_type == "portada"][0]{ fondoImagenUrl, fondoVideoUrl, dosTonos, promoActiva, promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto }`,
  );
  if (!d) return local;

  return {
    fondo: {
      imagen: optimizarSiCloudinary(d.fondoImagenUrl ?? undefined, 'imagen') ?? local.fondo.imagen,
      video: optimizarSiCloudinary(d.fondoVideoUrl ?? undefined, 'video') ?? local.fondo.video,
      dosTonos: d.dosTonos ?? local.fondo.dosTonos,
    },
    promo:
      d.promoActiva && d.promoTitulo
        ? {
            etiqueta: d.promoEtiqueta ?? '',
            titulo: d.promoTitulo,
            texto: d.promoTexto ?? undefined,
            enlace: d.promoEnlace ?? undefined,
            enlaceTexto: d.promoEnlaceTexto ?? undefined,
          }
        : local.promo,
  };
}

function optimizarSiCloudinary(url: string | undefined, tipo: 'imagen' | 'video') {
  if (!url) return undefined;
  if (!esCloudinary(url)) return url;
  return tipo === 'imagen' ? optimizarImagen(url, 'w_2000') : optimizarVideo(url, 'w_1280');
}
