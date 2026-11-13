import type { StructureResolver } from 'sanity/structure';

/**
 * "portada" es un singleton: siempre se edita el mismo documento
 * (documentId fijo "portada"), sin lista ni opción de crear uno nuevo.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Portada')
        .id('portada')
        .child(S.document().schemaType('portada').documentId('portada')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'portada'),
    ]);
