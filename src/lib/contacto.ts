/**
 * Datos de contacto (WhatsApp, Instagram, email, formulario de visita).
 *
 * Documento "contacto" en Sanity (singleton, _type == "contacto"), campos:
 *   whatsapp, whatsappUrl, instagram, email, formAction   string
 * Ninguno de estos campos se traduce (son números, enlaces y usuarios).
 */
import { site } from '../data/site';
import { getSingleton } from './sanitySingleton';

export interface Contacto {
  whatsapp: string;
  whatsappUrl: string;
  instagram: string;
  email: string;
  formAction: string;
}

type SanityContacto = Partial<Record<keyof Contacto, string | null>>;

export async function getContacto(_locale?: string): Promise<Contacto> {
  const local = site.contacto;
  const d = await getSingleton<SanityContacto>(
    'contacto',
    `{ whatsapp, whatsappUrl, instagram, email, formAction }`,
  );
  if (!d) return local;

  return {
    whatsapp: d.whatsapp?.trim() || local.whatsapp,
    whatsappUrl: d.whatsappUrl?.trim() || local.whatsappUrl,
    instagram: d.instagram?.trim() || local.instagram,
    email: d.email?.trim() || local.email,
    formAction: d.formAction?.trim() || local.formAction,
  };
}
