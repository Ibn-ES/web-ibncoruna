import { defineField, defineType } from 'sanity';

/**
 * Singleton: datos del grupo de jóvenes. Los campos coinciden con los que
 * lee src/lib/jovenes.ts en el sitio.
 */
export default defineType({
  name: 'jovenes',
  title: 'Jóvenes',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del grupo',
      description: 'Ej: "Jóvenes IBN Coruña"',
      type: 'string',
    }),
    defineField({
      name: 'cuando',
      title: 'Día y hora',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Usuario de Instagram',
      description: 'Sin la @. Ej: "jovenesibncoruna"',
      type: 'string',
    }),
  ],
  preview: {
    select: { nombre: 'nombre', cuando: 'cuando' },
    prepare: ({ nombre, cuando }) => ({ title: nombre || 'Jóvenes', subtitle: cuando }),
  },
});
