import { defineField, defineType } from 'sanity';

/**
 * Singleton: versículo destacado entre las secciones de la portada.
 * Los campos coinciden con los que lee src/lib/versiculo.ts en el sitio.
 */
export default defineType({
  name: 'versiculo',
  title: 'Versículo',
  type: 'document',
  fields: [
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'textoGl',
      title: 'Texto (gallego)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cita',
      title: 'Cita',
      description: 'Ej: "Mateo 11:28"',
      type: 'string',
    }),
    defineField({
      name: 'citaGl',
      title: 'Cita (gallego)',
      description: 'Normalmente igual que en español; cámbiala solo si usáis una traducción distinta de la Biblia.',
      type: 'string',
    }),
  ],
  preview: {
    select: { cita: 'cita' },
    prepare: ({ cita }) => ({ title: 'Versículo', subtitle: cita }),
  },
});
