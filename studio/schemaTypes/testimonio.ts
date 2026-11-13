import { defineField, defineType } from 'sanity';

/**
 * Testimonio: vídeo corto (reel) o frase. Los campos coinciden con los que
 * lee src/lib/testimonios.ts en el sitio.
 */
export default defineType({
  name: 'testimonio',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detalle',
      title: 'Detalle',
      description: '"viene desde 2021"…',
      type: 'string',
    }),
    defineField({
      name: 'texto',
      title: 'Frase',
      description: 'Obligatoria si no hay vídeo.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vídeo',
      description: 'URL de Cloudinary (normalmente). Sin vídeo, el testimonio se muestra como tarjeta de texto.',
      type: 'url',
    }),
    defineField({
      name: 'posterUrl',
      title: 'Portada del vídeo',
      description: 'Opcional: si no se pone, se saca un fotograma automáticamente (solo vídeos de Cloudinary).',
      type: 'url',
      hidden: ({ document }) => !document?.videoUrl,
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      description: 'Opcional: número más bajo sale primero. Sin ponerlo, se ordena por fecha de creación.',
      type: 'number',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => (doc?.texto || doc?.videoUrl ? true : 'Hace falta una frase (texto) o un vídeo (videoUrl).')),
  preview: {
    select: { nombre: 'nombre', detalle: 'detalle', texto: 'texto', videoUrl: 'videoUrl' },
    prepare: ({ nombre, detalle, texto, videoUrl }) => ({
      title: nombre || '(sin nombre)',
      subtitle: detalle || texto || (videoUrl ? 'Vídeo' : ''),
    }),
  },
});
