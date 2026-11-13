import { defineField, defineType } from 'sanity';

/**
 * Singleton: fondo del hero y tarjeta de promoción de la portada.
 * Los campos coinciden con los que lee src/lib/portada.ts en el sitio.
 */
export default defineType({
  name: 'portada',
  title: 'Portada',
  type: 'document',
  fields: [
    defineField({
      name: 'fondoImagenUrl',
      title: 'Foto de fondo',
      description: 'URL de Cloudinary (también hace de póster del vídeo). Vacío = ilustración del mar.',
      type: 'url',
    }),
    defineField({
      name: 'fondoVideoUrl',
      title: 'Vídeo de fondo',
      description: 'URL de Cloudinary. Vídeo corto en bucle, sin sonido (8-12 s, ≤ 3 MB). Opcional.',
      type: 'url',
    }),
    defineField({
      name: 'dosTonos',
      title: '¿A dos tonos?',
      description: 'Activo para fotos de ciudad o mar (se tiñen con la paleta). Desactívalo para fotos de personas.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'promoActiva',
      title: '¿Mostrar tarjeta de promoción?',
      description: 'Si no está activa, el hero muestra la tarjeta por defecto "Este domingo".',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'promoEtiqueta',
      title: 'Etiqueta',
      description: '"Navidad", "Bautismos", "Este sábado"…',
      type: 'string',
      hidden: ({ document }) => !document?.promoActiva,
    }),
    defineField({
      name: 'promoTitulo',
      title: 'Título',
      type: 'string',
      hidden: ({ document }) => !document?.promoActiva,
    }),
    defineField({
      name: 'promoTexto',
      title: 'Texto',
      type: 'text',
      rows: 2,
      hidden: ({ document }) => !document?.promoActiva,
    }),
    defineField({
      name: 'promoEnlace',
      title: 'Enlace',
      type: 'url',
      hidden: ({ document }) => !document?.promoActiva,
    }),
    defineField({
      name: 'promoEnlaceTexto',
      title: 'Texto del enlace',
      description: 'Por defecto: "Más información".',
      type: 'string',
      hidden: ({ document }) => !document?.promoActiva,
    }),
  ],
  preview: {
    select: { promoActiva: 'promoActiva', promoTitulo: 'promoTitulo' },
    prepare: ({ promoActiva, promoTitulo }) => ({
      title: 'Portada',
      subtitle: promoActiva ? `Promo activa: ${promoTitulo ?? '(sin título)'}` : 'Sin promo · tarjeta "Este domingo"',
    }),
  },
});
