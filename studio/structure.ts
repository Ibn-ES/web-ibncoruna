import type { StructureResolver } from 'sanity/structure';

/**
 * Documentos singleton de la portada: siempre se edita el mismo documento
 * (documentId fijo = su tipo), sin lista ni opción de crear uno nuevo.
 */
const singletons = [
  { type: 'portada', title: 'Portada (hero)' },
  { type: 'lema', title: 'Lema' },
  { type: 'domingo', title: 'Domingo' },
  { type: 'jovenes', title: 'Jóvenes' },
  { type: 'contacto', title: 'Contacto' },
  { type: 'predicasEnlaces', title: 'Prédicas · enlaces' },
  { type: 'versiculo', title: 'Versículo' },
  { type: 'esencia', title: 'Quiénes somos' },
  { type: 'legal', title: 'Aviso legal' },
  { type: 'privacidad', title: 'Política de privacidad' },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      ...singletons.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletons.some((s) => s.type === item.getId())),
    ]);
