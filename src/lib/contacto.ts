/**
 * Datos de contacto (WhatsApp, Instagram, email, formulario de visita, redes).
 *
 * Documento "contacto" en Sanity (singleton, _type == "contacto"), campos:
 *   whatsapp, whatsappUrl, instagram, email, formAction   string
 *   redes   array<{ tipo, url, etiqueta? }>  — iconos del pie de página
 * Ninguno de estos campos se traduce (son números, enlaces y usuarios).
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export type RedTipo = 'instagram' | 'whatsapp' | 'spotify' | 'apple' | 'youtube';

export interface RedSocial {
  tipo: RedTipo;
  url: string;
  etiqueta?: string;
}

export interface Contacto {
  whatsapp: string;
  whatsappUrl: string;
  instagram: string;
  email: string;
  formAction: string;
  redes: RedSocial[];
}

interface SanityContacto {
  whatsapp?: string | null;
  whatsappUrl?: string | null;
  instagram?: string | null;
  email?: string | null;
  formAction?: string | null;
  redes?: { tipo?: RedTipo | null; url?: string | null; etiqueta?: string | null }[] | null;
}

export async function getContacto(_locale?: string): Promise<Contacto> {
  const local = site.contacto;
  const d = await getSingleton<SanityContacto>(
    'contacto',
    `{ whatsapp, whatsappUrl, instagram, email, formAction, redes }`,
  );
  if (!d) return local;

  const redes = d.redes
    ?.filter((r): r is { tipo: RedTipo; url: string; etiqueta?: string | null } => Boolean(r.tipo && r.url?.trim()))
    .map((r) => ({ tipo: r.tipo, url: r.url.trim(), etiqueta: r.etiqueta?.trim() || undefined }));

  return {
    whatsapp: d.whatsapp?.trim() || local.whatsapp,
    whatsappUrl: d.whatsappUrl?.trim() || local.whatsappUrl,
    instagram: d.instagram?.trim() || local.instagram,
    email: d.email?.trim() || local.email,
    formAction: d.formAction?.trim() || local.formAction,
    redes: redes?.length ? redes : local.redes,
  };
}
