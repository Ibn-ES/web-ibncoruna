/** Utilidades para URLs de Cloudinary (las transformaciones van en la propia URL). */

export const esCloudinary = (url: string) => url.includes('res.cloudinary.com/');

/** Inserta transformaciones justo después de /upload/. */
export function transformar(url: string, t: string) {
  return url.replace('/upload/', `/upload/${t}/`);
}

export function optimizarVideo(url: string, extra = '') {
  return transformar(url, ['q_auto,vc_auto', extra].filter(Boolean).join(',')).replace(/\.\w+$/, '.mp4');
}

export function optimizarImagen(url: string, extra = '') {
  return transformar(url, ['f_auto,q_auto', extra].filter(Boolean).join(','));
}

/** Como optimizarImagen, pero solo si la URL es de Cloudinary; si no, la deja igual. */
export function optimizarImagenSiCloudinary(url: string | undefined, extra = '') {
  if (!url) return undefined;
  return esCloudinary(url) ? optimizarImagen(url, extra) : url;
}

/** Cloudinary saca un fotograma del vídeo si pides la misma URL en .jpg. */
export function posterDeVideo(url: string, extra = 'c_fill,ar_9:16,w_600') {
  return transformar(url, `so_1,${extra},q_auto,f_jpg`).replace(/\.\w+$/, '.jpg');
}
