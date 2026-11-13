import { defineField, defineType } from 'sanity';

/**
 * Singleton: aviso legal. Los campos coinciden con los que lee
 * src/lib/legal.ts en el sitio.
 */
export default defineType({
  name: 'legal',
  title: 'Aviso legal',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', initialValue: 'Aviso legal' }),
    defineField({ name: 'tituloGl', title: 'Título (gallego)', type: 'string' }),
    defineField({
      name: 'secciones',
      title: 'Secciones',
      description: 'Un apartado por bloque: "1. Datos identificativos", "2. Objeto", "3. Condiciones de uso"…',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'seccion',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 6, validation: (Rule) => Rule.required() }),
            defineField({ name: 'tituloGl', title: 'Título (gallego)', type: 'string' }),
            defineField({ name: 'textoGl', title: 'Texto (gallego)', type: 'text', rows: 6 }),
          ],
          preview: {
            select: { title: 'titulo' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { secciones: 'secciones' },
    prepare: ({ secciones }) => ({
      title: 'Aviso legal',
      subtitle: Array.isArray(secciones) ? `${secciones.length} secciones` : 'Sin secciones',
    }),
  },
});
