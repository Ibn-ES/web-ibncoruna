import { defineField, defineType } from 'sanity';

/**
 * Singleton: los tres valores de "Quiénes somos". Los campos coinciden
 * con los que lee src/lib/esencia.ts en el sitio.
 */
export default defineType({
  name: 'esencia',
  title: 'Quiénes somos',
  type: 'document',
  fields: [
    defineField({
      name: 'valores',
      title: 'Valores',
      description: 'Normalmente tres: título corto + una frase.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valor',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'texto', title: 'Texto', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tituloGl', title: 'Título (gallego)', type: 'string' }),
            defineField({ name: 'textoGl', title: 'Texto (gallego)', type: 'string' }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'texto' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { valores: 'valores' },
    prepare: ({ valores }) => ({
      title: 'Quiénes somos',
      subtitle: Array.isArray(valores) ? valores.map((v: { titulo?: string }) => v.titulo).join(' · ') : '',
    }),
  },
});
