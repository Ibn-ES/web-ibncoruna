/**
 * Textos fijos de la interfaz (los que viven en el código, no en Sanity),
 * en español y gallego. Las traducciones al gallego son una primera versión:
 * conviene que alguien de la iglesia las revise antes de publicar.
 *
 * Uso en un componente .astro:
 *   import { useTranslations } from '../i18n/ui';
 *   const t = useTranslations(Astro.currentLocale);
 *   ...
 *   <p>{t('semana.eyebrow')}</p>
 */

export const locales = ['es', 'gl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

type Valor = string | ((...args: string[]) => string);
type Diccionario = Record<string, Valor>;

const es: Diccionario = {
  'nav.principal': 'Principal',
  'nav.inicio': (nombre) => `${nombre}, inicio`,
  'nav.menu': 'Menú',
  'nav.abrirMenu': 'Abrir menú',
  'nav.cerrarMenu': 'Cerrar menú',
  'nav.visitanos': 'Visítanos',
  'nav.quienesSomos': 'Quiénes somos',
  'nav.predicas': 'Prédicas',
  'nav.testimonios': 'Testimonios',
  'nav.jovenes': 'Jóvenes',
  'nav.contacto': 'Contacto',

  'marquee.aria': 'Lemas',

  'idioma.es': 'Castellano',
  'idioma.gl': 'Galego',
  'idioma.cambiarA': (nombre) => `Cambiar a ${nombre}`,
  'idioma.seleccionar': 'Elegir idioma',

  'cta.planificaVisita': 'Planifica tu visita',

  'layout.saltarContenido': 'Saltar al contenido',
  'layout.description':
    'Iglesia en A Coruña centrada en la fé, alejada de la religión. Hay buenas noticias: solo tienes que venir.',

  'footer.aria': 'Pie de página',
  'footer.volverArriba': 'Volver arriba ↑',
  'footer.avisoLegal': 'Aviso legal',
  'footer.privacidad': 'Privacidad',

  'privacidad.texto': 'Usamos lo mínimo para que la web funcione: sin cookies de rastreo ni analítica de terceros.',
  'privacidad.masInfo': 'Más información',
  'privacidad.entendido': 'Entendido',
  'privacidad.eyebrow': 'Privacidad',
  'privacidad.metaDescription': 'Política de privacidad de Buenas Noticias A Coruña.',

  'legal.eyebrow': 'Aviso legal',
  'legal.metaDescription': 'Aviso legal de Buenas Noticias A Coruña.',

  'audioPlayer.reproductor': 'Reproductor de prédicas',
  'audioPlayer.pausarReanudar': 'Pausar o reanudar',
  'audioPlayer.posicion': 'Posición',
  'audioPlayer.cerrar': 'Cerrar reproductor',

  'playButton.escuchar': (titulo) => `Escuchar: ${titulo}`,
  'playButton.escucharSpotify': (titulo) => `Escuchar en Spotify: ${titulo}`,

  'episodeCover.predica': 'Prédica',

  'testimonios.eyebrow': 'Testimonios',
  'testimonios.titulo': 'Fé de verdad, gente de verdad.',
  'testimonios.anteriores': 'Anteriores',
  'testimonios.siguientes': 'Siguientes',
  'testimonios.ejemplo': 'Datos de ejemplo · configura Sanity o Cloudinary',
  'testimonios.verTestimonioDe': (nombre) => `Ver el testimonio de ${nombre}`,
  'testimonios.videoTestimonio': 'Vídeo · testimonio',
  'testimonios.espacioVideo': 'Espacio para un vídeo de testimonio',

  'semana.eyebrow': 'Cada semana',
  'semana.titulo': 'Un sitio para cada uno.',
  'semana.lead': '',
  'semana.fotoLabel': 'un domingo real, gente sin posar',
  'semana.domingosTitulo': 'Domingos',
  'semana.domingosTexto': 'Un culto para toda la familia. Hablamos de Jesús con palabras de todos los días.',
  'semana.comoEsDomingo': 'Cómo es un domingo',
  'semana.jovenesTexto': 'Amigos, preguntas y fé. Preguntas sin filtro: aquí no hay preguntas tontas.',
  'semana.primeraVisitaTitulo': 'Tu primera visita',
  'semana.primeraVisitaTexto': 'Qué esperar al llegar: cómo es un domingo, dónde aparcar y qué hay para los niños.',
  'semana.primeraVisitaAria': 'Tu primera visita: qué esperar',

  'esencia.eyebrow': 'Quiénes somos',
  'esencia.tituloPre': 'Una iglesia centrada en la',
  'esencia.tituloFe': 'fé',
  'esencia.tituloPost': ', alejada de la religión.',
  'esencia.lead': 'Para quienes ya forman parte de la iglesia y para quienes todavía no conocen a Dios, por igual. Jóvenes, familias y mayores.',

  'versiculo.aria': 'Versículo',

  'primeraVez.eyebrow': '¿Primera vez?',
  'primeraVez.titulo': 'Te esperamos',
  'primeraVez.lead': 'Una familia te espera',
  'primeraVez.q1': '¿Cuándo es?',
  'primeraVez.a1': (hora) => `Los domingos a las ${hora}. Ven cuando quieras, te esperamos.`,
  'primeraVez.q2': '¿Dónde estáis?',
  'primeraVez.comoLlegar': 'Cómo llegar ↗',
  'primeraVez.q3': '¿Cuánto dura?',
  'primeraVez.q4': '¿Qué pasa en un domingo?',
  'primeraVez.q5': '¿Y si vengo con niños?',
  'primeraVez.q6': '¿Tengo que saber algo antes?',
  'primeraVez.a6': 'No. Ven como eres, te esperamos',

  'visita.eyebrow': 'Planifica tu visita',
  'visita.titulo': 'Eres bienvenido.',
  'visita.lead': '',
  'visita.labelDireccion': 'Dirección',
  'visita.labelDomingos': 'Domingos',
  'visita.labelWhatsapp': 'WhatsApp',
  'visita.labelInstagram': 'Instagram',
  'visita.formNombre': 'Tu nombre',
  'visita.placeholderNombre': '¿Cómo te llamas?',
  'visita.legendCuando': '¿Qué domingo vienes?',
  'visita.opcionEsteDomingo': 'Este domingo',
  'visita.opcionProximo': 'El próximo',
  'visita.opcionNoSe': 'Aún no lo sé',
  'visita.legendNinos': '¿Vienes con niños?',
  'visita.si': 'Sí',
  'visita.no': 'No',
  'visita.formContacto': 'WhatsApp o email',
  'visita.placeholderContacto': 'Para confirmarte la hora',
  'visita.privacidadPre': 'Acepto que me contactéis solo para organizar mi visita.',
  'visita.politicaPrivacidad': 'Política de privacidad',
  'visita.enviar': 'Avisar de que voy',

  'predicas.eyebrow': 'Prédicas',
  'predicas.titulo': 'Escucha cuando quieras.',
  'predicas.lead': 'La prédica de cada domingo, en Spotify. Para el coche, el paseo o el sofá.',
  'predicas.seguirSpotify': 'Seguir en Spotify',
  'predicas.applePodcasts': 'Apple Podcasts ↗',
  'predicas.ejemplo': 'Datos de ejemplo · configura SPOTIFY_RSS_URL',
  'predicas.ultimaPredica': 'Última prédica',
  'predicas.abrirSpotify': 'Abrir en Spotify ↗',
  'predicas.verTodas': 'Ver todas las prédicas',
  'predicas.spotify': 'Spotify ↗',
  'predicas.pageLead': 'La prédica de cada domingo, con palabras de todos los días. Aquí o en Spotify, para el coche, el paseo o el sofá.',
  'predicas.todasAria': 'Todas las prédicas',
  'predicas.metaDescription': 'Las prédicas de cada domingo de Buenas Noticias A Coruña. Escúchalas aquí o en Spotify.',
  'predicas.buscarPlaceholder': 'Buscar por título o fecha…',
  'predicas.sinResultados': 'No hay prédicas que coincidan con tu búsqueda.',

  'paletteSwitcher.aria': 'Probar paleta de color',
  'paletteSwitcher.paleta': 'Paleta',

  'hero.esteDomingo': 'Este domingo',
  'hero.teGuardamosSitio': 'Te esperamos',
  'hero.masInformacion': 'Más información',
  'hero.anuncio': 'Anuncio',

  'photo.foto': (label) => `Foto · ${label}`,
  'photo.espacioPara': (label) => `Espacio para foto: ${label}`,
};

const gl: Diccionario = {
  'nav.principal': 'Principal',
  'nav.inicio': (nombre) => `${nombre}, inicio`,
  'nav.menu': 'Menú',
  'nav.abrirMenu': 'Abrir menú',
  'nav.cerrarMenu': 'Pechar menú',
  'nav.visitanos': 'Vistítanos',
  'nav.quienesSomos': 'Quen somos',
  'nav.predicas': 'Predicacións',
  'nav.testimonios': 'Testemuños',
  'nav.jovenes': 'Mocidade',
  'nav.contacto': 'Contacto',

  'marquee.aria': 'Lemas',

  'idioma.es': 'Castelán',
  'idioma.gl': 'Galego',
  'idioma.cambiarA': (nombre) => `Cambiar a ${nombre}`,
  'idioma.seleccionar': 'Elixir idioma',

  'cta.planificaVisita': 'Planifica a túa visita',

  'layout.saltarContenido': 'Ir ao contido',
  'layout.description':
    'Igrexa en A Coruña centrada na fé, afastada da relixión. Hai boas novas: só tes que vir.',

  'footer.aria': 'Pé de páxina',
  'footer.volverArriba': 'Volver arriba ↑',
  'footer.avisoLegal': 'Aviso legal',
  'footer.privacidad': 'Privacidade',

  'privacidad.texto': 'Usamos o mínimo para que a web funcione: sen cookies de rastrexo nin analítica de terceiros.',
  'privacidad.masInfo': 'Máis información',
  'privacidad.entendido': 'Entendido',
  'privacidad.eyebrow': 'Privacidade',
  'privacidad.metaDescription': 'Política de privacidade de Buenas Noticias A Coruña.',

  'legal.eyebrow': 'Aviso legal',
  'legal.metaDescription': 'Aviso legal de Buenas Noticias A Coruña.',

  'audioPlayer.reproductor': 'Reprodutor de predicacións',
  'audioPlayer.pausarReanudar': 'Pausar ou continuar',
  'audioPlayer.posicion': 'Posición',
  'audioPlayer.cerrar': 'Pechar reprodutor',

  'playButton.escuchar': (titulo) => `Escoitar: ${titulo}`,
  'playButton.escucharSpotify': (titulo) => `Escoitar en Spotify: ${titulo}`,

  'episodeCover.predica': 'Predicación',

  'testimonios.eyebrow': 'Testemuños',
  'testimonios.titulo': 'Fé de verdade, xente de verdade.',
  'testimonios.anteriores': 'Anteriores',
  'testimonios.siguientes': 'Seguintes',
  'testimonios.ejemplo': 'Datos de exemplo · configura Sanity ou Cloudinary',
  'testimonios.verTestimonioDe': (nombre) => `Ver o testemuño de ${nombre}`,
  'testimonios.videoTestimonio': 'Vídeo · testemuño',
  'testimonios.espacioVideo': 'Espazo para un vídeo de testemuño',

  'semana.eyebrow': 'Cada semana',
  'semana.titulo': 'Un sitio para cada un.',
  'semana.lead': '',
  'semana.fotoLabel': 'un domingo real, xente sen posar',
  'semana.domingosTitulo': 'Domingos',
  'semana.domingosTexto': 'Un culto para toda a familia. Falamos de Xesús con palabras de cada día.',
  'semana.comoEsDomingo': 'Como é un domingo',
  'semana.jovenesTexto': 'Amigos, preguntas e fé. Preguntas sen filtro: aquí non hai preguntas parvas.',
  'semana.primeraVisitaTitulo': 'A túa primeira visita',
  'semana.primeraVisitaTexto': 'Que esperar ao chegar: como é un domingo, onde aparcar e que hai para os nenos.',
  'semana.primeraVisitaAria': 'A túa primeira visita: que esperar',

  'esencia.eyebrow': 'Quen somos',
  'esencia.tituloPre': 'Unha igrexa centrada na',
  'esencia.tituloFe': 'fé',
  'esencia.tituloPost': ', afastada da relixión.',
  'esencia.lead': 'Para quen xa forma parte da igrexa e para quen aínda non coñece a Deus, por igual. Mozos, familias e maiores.',

  'versiculo.aria': 'Versículo',

  'primeraVez.eyebrow': 'Primeira vez?',
  'primeraVez.titulo': 'Esperámoste',
  'primeraVez.lead': 'Unha familia esperámoste',
  'primeraVez.q1': 'Cando é?',
  'primeraVez.a1': (hora) => `Os domingos ás ${hora}. Ven cando queiras`,
  'primeraVez.q2': 'Onde estades?',
  'primeraVez.comoLlegar': 'Como chegar ↗',
  'primeraVez.q3': 'Canto dura?',
  'primeraVez.q4': 'Que pasa nun domingo?',
  'primeraVez.q5': 'E se veño con nenos?',
  'primeraVez.q6': 'Teño que saber algo antes?',
  'primeraVez.a6': 'Non. Ven como es e trae a quen queiras.',

  'visita.eyebrow': 'Planifica a túa visita',
  'visita.titulo': 'Eres benvido.',
  'visita.lead': 'Trae a quen queiras.',
  'visita.labelDireccion': 'Enderezo',
  'visita.labelDomingos': 'Domingos',
  'visita.labelWhatsapp': 'WhatsApp',
  'visita.labelInstagram': 'Instagram',
  'visita.formNombre': 'O teu nome',
  'visita.placeholderNombre': 'Como te chamas?',
  'visita.legendCuando': 'Que domingo vés?',
  'visita.opcionEsteDomingo': 'Este domingo',
  'visita.opcionProximo': 'O seguinte',
  'visita.opcionNoSe': 'Aínda non o sei',
  'visita.legendNinos': 'Vés con nenos?',
  'visita.si': 'Si',
  'visita.no': 'Non',
  'visita.formContacto': 'WhatsApp ou email',
  'visita.placeholderContacto': 'Para confirmarche a hora',
  'visita.privacidadPre': 'Acepto que me contactedes só para organizar a miña visita.',
  'visita.politicaPrivacidad': 'Política de privacidade',
  'visita.enviar': 'Avisar de que vou',

  'predicas.eyebrow': 'Predicacións',
  'predicas.titulo': 'Escoita cando queiras.',
  'predicas.lead': 'A predicación de cada domingo, en Spotify. Para o coche, o paseo ou o sofá.',
  'predicas.seguirSpotify': 'Seguir en Spotify',
  'predicas.applePodcasts': 'Apple Podcasts ↗',
  'predicas.ejemplo': 'Datos de exemplo · configura SPOTIFY_RSS_URL',
  'predicas.ultimaPredica': 'Última predicación',
  'predicas.abrirSpotify': 'Abrir en Spotify ↗',
  'predicas.verTodas': 'Ver todas as predicacións',
  'predicas.spotify': 'Spotify ↗',
  'predicas.pageLead': 'A predicación de cada domingo, con palabras do día a día. Aquí ou en Spotify, para o coche, o paseo ou o sofá.',
  'predicas.todasAria': 'Todas as predicacións',
  'predicas.metaDescription': 'As predicacións de cada domingo de Buenas Noticias A Coruña. Escóitaas aquí ou en Spotify.',
  'predicas.buscarPlaceholder': 'Buscar por título ou data…',
  'predicas.sinResultados': 'Non hai predicacións que coincidan coa túa busca.',

  'paletteSwitcher.aria': 'Probar paleta de cor',
  'paletteSwitcher.paleta': 'Paleta',

  'hero.esteDomingo': 'Este domingo',
  'hero.teGuardamosSitio': 'Te esperamos.',
  'hero.masInformacion': 'Máis información',
  'hero.anuncio': 'Anuncio',

  'photo.foto': (label) => `Foto · ${label}`,
  'photo.espacioPara': (label) => `Espazo para foto: ${label}`,
};

const diccionarios: Record<Locale, Diccionario> = { es, gl };

export function esLocale(valor: string | undefined): Locale {
  return valor === 'gl' ? 'gl' : defaultLocale;
}

/** Devuelve una función t(clave, ...args) que resuelve al idioma dado, con el español como respaldo. */
export function useTranslations(locale: string | undefined) {
  const l = esLocale(locale);
  return function t(clave: string, ...args: string[]): string {
    const valor = diccionarios[l][clave] ?? diccionarios.es[clave] ?? clave;
    return typeof valor === 'function' ? valor(...args) : valor;
  };
}

/** Construye el href equivalente en el idioma dado (el español va sin prefijo). */
export function localizedHref(locale: string | undefined, href: string): string {
  return esLocale(locale) === 'gl' ? `/gl${href}` : href;
}

export function otherLocale(locale: string | undefined): Locale {
  return esLocale(locale) === 'gl' ? 'es' : 'gl';
}

/** La misma página (pathname actual), pero en el otro idioma. */
export function switchLocaleHref(locale: string | undefined, pathname: string): string {
  const actual = esLocale(locale);
  const sinPrefijo = actual === 'gl' ? pathname.replace(/^\/gl/, '') || '/' : pathname;
  return actual === 'gl' ? sinPrefijo : `/gl${sinPrefijo === '/' ? '' : sinPrefijo}`;
}
