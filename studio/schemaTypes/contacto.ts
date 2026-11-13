import { defineField, defineType } from 'sanity';

/**
 * Singleton: datos de contacto. Los campos coinciden con los que
 * lee src/lib/contacto.ts en el sitio.
 */
export default defineType({
  name: 'contacto',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp (texto a mostrar)',
      type: 'string',
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'Enlace de WhatsApp',
      description: 'Ej: "https://wa.me/34XXXXXXXXX"',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Usuario de Instagram',
      description: 'Sin la @.',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'formAction',
      title: 'Destino del formulario "Planifica tu visita"',
      description: 'Endpoint que recibe el formulario (Formspree u otro).',
      type: 'url',
    }),
  ],
  preview: {
    select: { email: 'email', instagram: 'instagram' },
    prepare: ({ email, instagram }) => ({
      title: 'Contacto',
      subtitle: [email, instagram && `@${instagram}`].filter(Boolean).join(' · '),
    }),
  },
});
