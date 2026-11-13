# Buenas Noticias A Coruña · web

Portada de la web de la iglesia, hecha con [Astro](https://astro.build) siguiendo la propuesta de identidad visual (septiembre 2026).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (HTML estático)
npm run preview   # sirve dist/ para comprobar el build
```

Requiere Node ≥ 22.23 (lo pide Astro 7).

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `src/data/site.ts` | **Contenido fijo**: textos, horario, dirección, redes. Los huecos van entre `[CORCHETES]`. |
| `src/lib/predicas.ts` | Lee las prédicas del **RSS del podcast** (Spotify for Creators). |
| `src/lib/testimonios.ts` | Lee los testimonios de **Sanity** o, si no, de **Cloudinary**. |
| `src/lib/portada.ts` | Fondo del hero y tarjeta de promoción (Sanity o `site.ts`). |
| `src/styles/global.css` | Tokens de las tres paletas, tipografías, botones y utilidades. |
| `src/layouts/Layout.astro` | `<head>`, SEO, carga de fuentes y elección de paleta. |
| `src/pages/index.astro` | La portada: solo ordena las secciones. |
| `src/pages/predicas.astro` | Página `/predicas` con todas las prédicas. |
| `src/components/` | Una sección por fichero (`Hero`, `Semana`, `Esencia`, `PrimeraVez`, `Visita`…). |

## Decisiones (y por qué)

- **Tailwind v4**, con las utilidades directamente en el `class` del marcado. Los tokens de marca (paletas, tipografía, radios) viven en `global.css` como custom properties y se exponen a Tailwind con `@theme inline`, así `bg-deep` o `text-warm` siguen el cambio de paleta en vivo. Solo queda CSS en un `<style>` por componente para lo que Tailwind no cubre (`@keyframes`, `::details-content`…).
- **Poco JavaScript.**
  - El menú móvil usa la Popover API nativa, las preguntas frecuentes `<details>` y las animaciones de scroll son CSS (`animation-timeline`).
  - Solo llevan script el reproductor de audio, el carrusel de testimonios y el selector de paleta. En navegadores que no las soportan, el contenido simplemente aparece sin animar. Con "reducir movimiento" activado no se mueve nada.
- **Fuentes servidas desde la propia web** (`@fontsource-variable`), no desde Google Fonts: más rápido y sin enviar datos de visitantes a Google (RGPD).
- **Base blanca.** El fondo es blanco; las superficies usan un velo muy suave de la bruma (`--surface`). La arena de la marca queda solo como token.
- **Paletas como variables CSS.** `data-palette="a|b|c"` en `<html>` cambia todos los colores. Los nombres son neutros (`--band`, `--deep`, `--warm`…) para no reescribir CSS cuando la directiva elija.
  - En la B (Bandera), el blanco sobre `#0099CC` no llega al contraste mínimo, por eso los botones usan el azul profundo.
- **Contenido separado en `site.ts`** con la forma de datos que tendría una respuesta de Sanity: cambiarlo por una query real no obliga a tocar los componentes.

## Prédicas y testimonios

Copia `.env.example` a `.env`. Sin variables, la web usa **datos de ejemplo** y lo indica con una etiqueta.

**Prédicas → `SPOTIFY_RSS_URL`.** Es el RSS público que da Spotify for Creators (Ajustes › Disponibilidad › RSS).
- Se usa el RSS y no la API de Spotify porque no necesita credenciales y trae el MP3 de cada episodio.
- Eso permite escuchar las prédicas en la propia web, con un reproductor flotante (`AudioPlayer.astro`) que también responde a los controles de la pantalla de bloqueo del móvil.
- Si un episodio no trae audio, el botón enlaza a Spotify.

**Testimonios → Sanity (prioridad) o Cloudinary.**
- **Sanity:** `SANITY_PROJECT_ID` (proyecto `na5c11mv`, dataset `production`; `SANITY_TOKEN` solo si el dataset deja de ser público). Documentos de tipo `testimonio` con estos campos (detallados en `src/lib/testimonios.ts`):
  - `orden` (opcional), `nombre`, `detalle`, `texto`
  - `videoUrl`: URL externa del vídeo (normalmente de Cloudinary)
  - `posterUrl` (opcional)
  - Sin vídeo, el testimonio es una tarjeta de texto. Sanity ya distingue borrador/publicado, así que solo se leen los documentos publicados.
- **Cloudinary:** `CLOUDINARY_CLOUD_NAME` + `CLOUDINARY_TESTIMONIOS_TAG`. Lista todos los vídeos con esa etiqueta. Nombre, detalle y frase van en el *contextual metadata* (`nombre`, `detalle`, `texto`). Requiere activar *Resource list* en Settings › Security.
- Con URLs de Cloudinary se añade `q_auto,vc_auto` al vídeo, y la portada se genera sola a partir de un fotograma.

### Cuándo se actualizan

Todo se lee **al hacer el build**, así que la web sigue siendo HTML estático (rápida y barata de servir). Para que aparezca contenido nuevo hay que reconstruir:
- **Prédicas:** un cron semanal, el domingo por la noche.
- **Testimonios:** un webhook de Sanity (al crear o editar un documento `testimonio` o `portada`) que llame a un webhook de tu CI (GitHub Actions `repository_dispatch`, Jenkins…).

Si una fuente está configurada pero falla, **el build falla a propósito**: así se mantiene la versión publicada en vez de subir una web sin prédicas.

## Hero: fondo y promoción

El hero puede llevar **foto o vídeo de fondo** y una **tarjeta para anunciar** algo (un evento, una campaña). Sin nada configurado, muestra la ilustración del mar y la tarjeta «Este domingo».

- **Dónde se configura:** en `site.ts` (`hero`) o, mejor, en el documento singleton `portada` de Sanity, para cambiar la campaña desde el panel. Campos en `src/lib/portada.ts`. Si el documento no existe, se usa `site.ts` sin romper el build.
- **Tratamiento:** con `dosTonos` la imagen se tiñe con la paleta (para ciudad y mar). Las fotos de personas van a color natural (`dosTonos: false`). En los dos casos hay un velo azul para que el texto blanco se lea siempre.
- **Vídeo:** no lleva `autoplay` en el HTML. Un script lo arranca solo si la persona no tiene activado «reducir movimiento» ni «ahorro de datos», y lo pausa cuando el hero sale de pantalla. Mientras carga se ve la foto (`poster`).
- **Recomendaciones:** vídeo de 8-12 s, 720p, sin sonido, ≤ 3 MB, con foto de póster; nada de fotos de stock; niños siempre sin caras.

## Elegir la paleta

- Mientras se decide: el selector flotante del lado derecho, o `?paleta=a`, `?paleta=b`, `?paleta=c` en la URL.
- Una vez decidida: `defaultPalette` en `site.ts` y `showPaletteSwitcher: false`.

## Pendiente

- [ ] Rellenar los `[HUECOS]` de `site.ts` (hora, dirección, duración, niños, WhatsApp, testimonio).
- [ ] Sustituir el trazo provisional de la ola (`Wave.astro`) por el trazo real de la firma.
- [ ] Fotos reales: `<Photo src="…">`. Las de ciudad y mar, con `duotone`; las de personas, a color natural. Niños siempre sin caras.
- [ ] Conectar el formulario "Planifica tu visita" (`site.contacto.formAction`) y redactar la política de privacidad.
- [ ] Si la directiva elige Merriweather o Nunito como letra de lectura: cambiar el import en `Layout.astro` y `--font-body` en `global.css`.
- [ ] Poner el dominio definitivo en `astro.config.mjs`.
- [ ] `SPOTIFY_RSS_URL` y los enlaces de Spotify / Apple Podcasts en `site.ts` (`predicas`).
- [ ] Crear el schema y el contenido de `testimonio` y `portada` en Sanity, y el webhook de rebuild.
- [ ] Grabar el vídeo o elegir la foto del hero.
