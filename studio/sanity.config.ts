import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'Buenas Noticias A Coruña',

  projectId: 'na5c11mv',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Evita crear un segundo documento "portada" desde el menú "+" global:
    // el singleton solo se edita desde el atajo de la barra lateral.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((template) => template.templateId !== 'portada') : prev,
  },
});
