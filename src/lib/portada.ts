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
 *   eyebrow, texto, botonPrincipalTexto, botonSecundarioTexto   string
 *   eyebrowGl, textoGl, botonPrincipalTextoGl, botonSecundarioTextoGl   string (versión en gallego)
 *   promoActiva      boolean
 *   promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto   string
 *   promoEtiquetaGl, promoTituloGl, promoTextoGl, promoEnlaceTextoGl   string (versión en gallego)
 */
import { site, type Promo } from '../data/site';
import { esLocale } from '../i18n/ui';
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
  eyebrowGl?: string | null;
  textoGl?: string | null;
  botonPrincipalTextoGl?: string | null;
  botonSecundarioTextoGl?: string | null;
  promoActiva?: boolean | null;
  promoEtiqueta?: string | null;
  promoTitulo?: string | null;
  promoTexto?: string | null;
  promoEnlace?: string | null;
  promoEnlaceTexto?: string | null;
  promoEtiquetaGl?: string | null;
  promoTituloGl?: string | null;
  promoTextoGl?: string | null;
  promoEnlaceTextoGl?: string | null;
}

export async function getPortada(locale?: string): Promise<Portada> {
  const gl = esLocale(locale) === 'gl';
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
    `{ fondoImagenUrl, fondoVideoUrl, dosTonos, eyebrow, texto, botonPrincipalTexto, botonSecundarioTexto, eyebrowGl, textoGl, botonPrincipalTextoGl, botonSecundarioTextoGl, promoActiva, promoEtiqueta, promoTitulo, promoTexto, promoEnlace, promoEnlaceTexto, promoEtiquetaGl, promoTituloGl, promoTextoGl, promoEnlaceTextoGl }`,
  );
  if (!d) return local;

  return {
    fondo: {
      imagen: optimizarImagenSiCloudinary(d.fondoImagenUrl ?? undefined, 'w_2000') ?? local.fondo.imagen,
      video: optimizarVideoSiCloudinary(d.fondoVideoUrl ?? undefined) ?? local.fondo.video,
      dosTonos: d.dosTonos ?? local.fondo.dosTonos,
    },
    eyebrow: (gl && d.eyebrowGl) || d.eyebrow || local.eyebrow,
    texto: (gl && d.textoGl) || d.texto || local.texto,
    botonPrincipalTexto: (gl && d.botonPrincipalTextoGl) || d.botonPrincipalTexto || local.botonPrincipalTexto,
    botonSecundarioTexto: (gl && d.botonSecundarioTextoGl) || d.botonSecundarioTexto || local.botonSecundarioTexto,
    promo:
      d.promoActiva && d.promoTitulo
        ? {
            etiqueta: (gl && d.promoEtiquetaGl) || d.promoEtiqueta || '',
            titulo: (gl && d.promoTituloGl) || d.promoTitulo,
            texto: (gl && d.promoTextoGl) || d.promoTexto || undefined,
            enlace: d.promoEnlace ?? undefined,
            enlaceTexto: (gl && d.promoEnlaceTextoGl) || d.promoEnlaceTexto || undefined,
          }
        : local.promo,
  };
}

function optimizarVideoSiCloudinary(url: string | undefined) {
  if (!url) return undefined;
  return esCloudinary(url) ? optimizarVideo(url, 'w_1280') : url;
}
