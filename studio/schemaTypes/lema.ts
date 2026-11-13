import { defineField, defineType } from 'sanity';

/**
 * Singleton: lema de la iglesia. Los campos coinciden con los que
 * lee src/lib/lema.ts en el sitio (hero, pie de página y banda de frases).
 */
export default defineType({
  name: 'lema',
  title: 'Lema',
  type: 'document',
  fields: [
    defineField({
      name: 'principal',
      title: 'Lema principal',
      description: 'Primera línea del titular del hero. Ej: "Hay buenas noticias."',
      type: 'string',
    }),
    defineField({
      name: 'secundario',
      title: 'Lema secundario',
      description: 'Segunda línea del titular del hero. Ej: "Solo tienes que venir."',
      type: 'string',
    }),
    defineField({
      name: 'alternativos',
      title: 'Lemas alternativos',
      description: 'Frases que se repiten en la banda que se desplaza bajo el hero.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { principal: 'principal', secundario: 'secundario' },
    prepare: ({ principal, secundario }) => ({
      title: 'Lema',
      subtitle: [principal, secundario].filter(Boolean).join(' '),
    }),
  },
});
