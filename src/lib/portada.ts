/**
 * Configuración del hero: fondo (foto / vídeo), textos, botones y tarjeta de promoción.
 *
 * Por defecto sale de site.ts. Si hay Sanity y existe el documento "portada",
 * sus valores mandan: así se cambia la campaña desde el panel, sin tocar código.
 *
 * Documento "portada" en Sanity (singleton, _type == "portada"), campos:
 *   fondoImagenUrl   url      foto de fondo, normalmente de Cloudinary
 *   fondoVideoUrl    url      vídeo en bucle, sin sonido, normalmente de Cloudinary
 *   dosTonos         boolean  ciudad/mar = true · personas = false
 *   eyebrow          string   etiqueta pequeña encima del titular
 *   texto            text     párrafo bajo el titular
 *   botonPrincipalTexto, botonSecundarioTexto   string
 *   promoActiva      boolean
 *   promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto   string
 */
import { site, type Promo } from '../data/site';
import { esCloudinary, optimizarImagenSiCloudinary, optimizarVideo } from './cloudinary';
import { getSingleton } from './sanitySingleton';

export interface Portada {
  fondo: { imagen?: string; video?: string; dosTonos: boolean };
  eyebrow: string;
  texto: string;
  botonPrincipalTexto: string;
  botonSecundarioTexto: string;
  promo: Promo | null;
}

interface SanityPortada {
  fondoImagenUrl?: string | null;
  fondoVideoUrl?: string | null;
  dosTonos?: boolean | null;
  eyebrow?: string | null;
  texto?: string | null;
  botonPrincipalTexto?: string | null;
  botonSecundarioTexto?: string | null;
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
      imagen: optimizarImagenSiCloudinary(site.hero.fondo.imagen, 'w_2000'),
      video: optimizarVideoSiCloudinary(site.hero.fondo.video),
      dosTonos: site.hero.fondo.dosTonos,
    },
    eyebrow: site.hero.eyebrow,
    texto: site.hero.texto,
    botonPrincipalTexto: site.hero.botonPrincipalTexto,
    botonSecundarioTexto: site.hero.botonSecundarioTexto,
    promo: site.hero.promo,
  };

  // El singleton es opcional: si no existe todavía, seguimos con site.ts.
  const d = await getSingleton<SanityPortada>(
    'portada',
    `{ fondoImagenUrl, fondoVideoUrl, dosTonos, eyebrow, texto, botonPrincipalTexto, botonSecundarioTexto, promoActiva, promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto }`,
  );
  if (!d) return local;

  return {
    fondo: {
      imagen: optimizarImagenSiCloudinary(d.fondoImagenUrl ?? undefined, 'w_2000') ?? local.fondo.imagen,
      video: optimizarVideoSiCloudinary(d.fondoVideoUrl ?? undefined) ?? local.fondo.video,
      dosTonos: d.dosTonos ?? local.fondo.dosTonos,
    },
    eyebrow: d.eyebrow ?? local.eyebrow,
    texto: d.texto ?? local.texto,
    botonPrincipalTexto: d.botonPrincipalTexto ?? local.botonPrincipalTexto,
    botonSecundarioTexto: d.botonSecundarioTexto ?? local.botonSecundarioTexto,
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

function optimizarVideoSiCloudinary(url: string | undefined) {
  if (!url) return undefined;
  return esCloudinary(url) ? optimizarVideo(url, 'w_1280') : url;
}
