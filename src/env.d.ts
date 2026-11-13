interface ImportMetaEnv {
  /** RSS del podcast en Spotify for Creators (Ajustes > Distribución > RSS). */
  readonly SPOTIFY_RSS_URL?: string;
  /** Project ID de Sanity (Project settings > API). */
  readonly SANITY_PROJECT_ID?: string;
  /** Dataset de Sanity; por defecto "production". */
  readonly SANITY_DATASET?: string;
  /** Token de lectura de Sanity (solo si el dataset no es público). */
  readonly SANITY_TOKEN?: string;
  /** Alternativa a Sanity para testimonios: vídeos de Cloudinary con una etiqueta. */
  readonly CLOUDINARY_CLOUD_NAME?: string;
  readonly CLOUDINARY_TESTIMONIOS_TAG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
