import { defineField, defineType } from 'sanity';

/**
 * Singleton: enlaces de "Seguir en Spotify" / "Apple Podcasts". Los campos
 * coinciden con los que lee src/lib/predicasEnlaces.ts en el sitio.
 * No confundir con los episodios, que vienen del RSS (SPOTIFY_RSS_URL).
 */
export default defineType({
  name: 'predicasEnlaces',
  title: 'Prédicas · enlaces',
  type: 'document',
  fields: [
    defineField({
      name: 'spotifyUrl',
      title: 'Enlace a Spotify',
      type: 'url',
    }),
    defineField({
      name: 'applePodcastsUrl',
      title: 'Enlace a Apple Podcasts',
      description: 'Vacío = no se muestra el botón.',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Prédicas · enlaces' }),
  },
});
