/**
 * Todo el contenido de la portada vive aquí.
 *
 * Los textos entre corchetes ([HORA], [DIRECCIÓN]…) son huecos pendientes:
 * la directiva tiene que darlos. Cuando conectemos Directus, este fichero
 * se sustituye por una llamada a la API con la misma forma de datos.
 */

export type Palette = 'a' | 'b' | 'c';

export const palettes: Record<Palette, { name: string }> = {
  a: { name: 'Atlántico' },
  b: { name: 'Bandera' },
  c: { name: 'Ría de noche' },
};

export interface Promo {
  etiqueta: string; // "Navidad", "Bautismos", "Este sábado"…
  titulo: string;
  texto?: string;
  enlace?: string;
  enlaceTexto?: string;
}

export const site = {
  name: 'Buenas Noticias A Coruña',
  shortName: 'IBN Coruña',
  description:
    'Iglesia en A Coruña centrada en la fe, alejada de la religión. Hay buenas noticias: solo tienes que venir.',

  /** Paleta por defecto mientras la directiva decide (a, b o c). */
  defaultPalette: 'a' as Palette,
  /** Muestra el selector flotante de paletas. Ponlo a false al publicar. */
  showPaletteSwitcher: false,

  /**
   * Hero de la portada. Si Directus tiene la colección "portada", sus valores
   * mandan sobre estos (así se cambia la campaña sin tocar código).
   */
  hero: {
    fondo: {
      /** Foto de fondo (también hace de póster del vídeo). Vacío = ilustración del mar.
       * TODO: esta es una foto de muestra (banco de imágenes) solo para ver el resultado.
       * Sustitúyela por una foto real de la iglesia antes de publicar. 
       * imagen: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop',
       * */
      imagen: '',
      /** Vídeo corto en bucle, sin sonido (MP4, 8-12 s, ≤ 3 MB). Opcional. */
      video: '',
      /** true para ciudad y mar (dos tonos con la paleta); false para fotos de personas. */
      dosTonos: false,
    },
    /** Tarjeta flotante para anunciar algo. null = tarjeta "Este domingo". */
    promo: null as Promo | null,
    eyebrow: 'Iglesia en A Coruña · fe, no religión',
    texto: 'Una iglesia con Cristo en el centro, de tú a tú. Da igual si llevas toda la vida en la fe o si nunca has pisado una iglesia: ven como eres, te esperamos.',
    botonPrincipalTexto: 'Planifica tu visita',
    botonSecundarioTexto: '¿Primera vez?',
  },

  lema: {
    principal: 'Hay buenas noticias.',
    secundario: 'Solo tienes que venir.',
    alternativos: ['Ven como eres', 'Tu familia de la fe', 'Fe de verdad, gente de verdad'],
  },

  domingo: {
    hora: '[HORA]',
    direccion: '[DIRECCIÓN]',
    direccionCompleta: '[CALLE Y NÚMERO], A Coruña',
    duracion: '[DURACIÓN]',
    ninos: '[QUÉ HAY PARA LOS NIÑOS]',
    resumen: '[Dos o tres frases sobre cómo es un domingo, con palabras de todos los días]',
    mapaUrl: '#', // enlace a Google Maps / OpenStreetMap
    /** Foto real de un domingo (p. ej. la última de Instagram). Vacío = no se muestra. */
    fotoDestacadaUrl: '',
  },

  jovenes: {
    nombre: 'Jóvenes IBN Coruña',
    cuando: '[DÍA Y HORA]',
    instagram: 'jovenesibncoruna',
  },

  contacto: {
    whatsapp: '[NÚMERO]',
    whatsappUrl: '#', // https://wa.me/34XXXXXXXXX
    instagram: 'buenasnoticiascoruna',
    email: '[EMAIL]',
    /** Endpoint que recibirá el formulario "Planifica tu visita" (Directus, Formspree…). */
    formAction: '#',
  },

  /** Aviso legal y política de privacidad: de momento viven en la web principal. */
  legal: {
    avisoUrl: 'https://ibnbuenasnoticias.com/legal',
    privacidadUrl: 'https://ibnbuenasnoticias.com/privacidad',
  },

  predicas: {
    /** Enlace al programa en Spotify (botón "Seguir en Spotify"). */
    spotifyUrl: '#',
    /** Cuando esté en Apple Podcasts, pon aquí el enlace; vacío = no se muestra. */
    applePodcastsUrl: '',
  },

  versiculo: {
    texto: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.',
    cita: 'Mateo 11:28',
  },

  esencia: [
    { titulo: 'Amor', texto: 'Recibimos a cada persona como es.' },
    { titulo: 'Fe', texto: 'Cristo en el centro de todo lo que hacemos.' },
    { titulo: 'Cercanía', texto: 'Somos tu familia de la fe: de tú a tú.' },
  ],

  // Rutas con "/" delante para que funcionen también desde /predicas.
  // La etiqueta de cada uno vive en i18n/ui.ts (clave `nav.<key>`), para que
  // salga traducida sin tocar este fichero.
  nav: [
    { key: 'visitanos', href: '/#visitanos' },
    { key: 'quienesSomos', href: '/#quienes' },
    { key: 'predicas', href: '/predicas' },
    { key: 'testimonios', href: '/#testimonios' },
    { key: 'jovenes', href: '/#jovenes' },
    { key: 'contacto', href: '/#contacto' },
  ],
};
