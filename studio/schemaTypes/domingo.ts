import { defineField, defineType } from 'sanity';

/**
 * Singleton: datos del domingo. Los campos coinciden con los que
 * lee src/lib/domingo.ts en el sitio. Los campos "(gallego)" son
 * opcionales: vacíos, se usa el español. La hora, el mapa y la foto
 * no se traducen.
 */
export default defineType({
  name: 'domingo',
  title: 'Domingo',
  type: 'document',
  fields: [
    defineField({
      name: 'hora',
      title: 'Hora',
      description: 'Ej: "11:00"',
      type: 'string',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección (corta)',
      description: 'La que sale en la tarjeta del hero. Ej: "Centro, A Coruña"',
      type: 'string',
    }),
    defineField({
      name: 'direccionGl',
      title: 'Dirección (corta, gallego)',
      type: 'string',
    }),
    defineField({
      name: 'direccionCompleta',
      title: 'Dirección completa',
      description: 'Calle y número. Ej: "Calle Example 12, A Coruña"',
      type: 'string',
    }),
    defineField({
      name: 'direccionCompletaGl',
      title: 'Dirección completa (gallego)',
      type: 'string',
    }),
    defineField({
      name: 'duracion',
      title: 'Duración',
      description: 'Ej: "1 hora y media"',
      type: 'string',
    }),
    defineField({
      name: 'duracionGl',
      title: 'Duración (gallego)',
      type: 'string',
    }),
    defineField({
      name: 'ninos',
      title: 'Qué hay para los niños',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ninosGl',
      title: 'Qué hay para los niños (gallego)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'resumen',
      title: 'Cómo es un domingo',
      description: 'Dos o tres frases, con palabras de todos los días.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resumenGl',
      title: 'Cómo es un domingo (gallego)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mapaUrl',
      title: 'Enlace al mapa',
      description: 'Google Maps, OpenStreetMap…',
      type: 'url',
    }),
    defineField({
      name: 'fotoDestacadaUrl',
      title: 'Foto destacada',
      description: 'URL de Cloudinary (una foto real del domingo, por ejemplo la última de Instagram). Opcional.',
      type: 'url',
    }),
  ],
  preview: {
    select: { hora: 'hora', direccion: 'direccion' },
    prepare: ({ hora, direccion }) => ({
      title: 'Domingo',
      subtitle: [hora, direccion].filter(Boolean).join(' · '),
    }),
  },
});
