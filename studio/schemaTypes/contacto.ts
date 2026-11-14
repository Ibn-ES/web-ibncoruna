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
    defineField({
      name: 'redes',
      title: 'Redes sociales (iconos del pie de página)',
      description: 'Elige qué iconos salen en el pie de página, en qué orden, y a dónde enlazan.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'red',
          fields: [
            defineField({
              name: 'tipo',
              title: 'Red',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'Apple Podcasts', value: 'apple' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'url', title: 'Enlace', type: 'url', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'etiqueta',
              title: 'Etiqueta accesible',
              description: 'Para lectores de pantalla, ya que el icono va solo. Ej: "Instagram de jóvenes".',
              type: 'string',
            }),
          ],
          preview: {
            select: { tipo: 'tipo', etiqueta: 'etiqueta', url: 'url' },
            prepare: ({ tipo, etiqueta, url }) => ({ title: etiqueta || tipo, subtitle: url }),
          },
        },
      ],
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
