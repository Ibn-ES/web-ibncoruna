# AGENTS.md

Guía para agentes de IA (y personas) que trabajen en este repositorio. Léela entera antes de cambiar nada.

## Qué es

Web de **Buenas Noticias A Coruña** (IBN Coruña), una iglesia de A Coruña: portada (`/`) y página de prédicas (`/predicas`).

- Sitio **estático** hecho con **Astro 7**. El build genera HTML en `dist/`.
- El contenido dinámico (prédicas, testimonios, hero) se lee **en el build** desde fuentes externas.
- La identidad visual viene de la propuesta «Identidad visual de Buenas Noticias A Coruña» (septiembre 2026). Sus reglas están resumidas abajo y **no son negociables**.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/; tiene que terminar en "Complete!" sin errores
npm run preview    # sirve dist/
npm run test       # Vitest
npm run lint       # ESLint (incluye .astro)
```

- Requiere **Node ≥ 22.23** (lo exige Astro 7).
- **Siempre debe haber tests.** Toda función con lógica propia en `lib/` (parseo, formateo, transformaciones de URL…) lleva su `*.test.ts` con Vitest al lado (ver `lib/predicas.test.ts`, `lib/cloudinary.test.ts`). Los componentes `.astro` no se testean unitariamente; se comprueban en el navegador.
- **Verificar un cambio** = `npm run lint` y `npm run test` sin errores + `npm run build` sin errores + revisarlo en el navegador a 1440 px y a 390 px.
- CI en GitHub Actions (`.github/workflows/ci.yml`) corre `lint` y `test` en cada push a `main`/`develop` y en cada pull request.

## Estructura

```
src/
  data/site.ts          Contenido fijo y configuración (textos, horario, enlaces, nav, hero por defecto)
  lib/predicas.ts       Prédicas desde el RSS del podcast (Spotify for Creators)
  lib/testimonios.ts    Testimonios desde Sanity → Cloudinary → ejemplo
  lib/portada.ts        Fondo del hero y tarjeta de promoción (Sanity → site.ts)
  lib/sanity.ts         Cliente de Sanity (opcional, undefined sin SANITY_PROJECT_ID)
  lib/cloudinary.ts     Helpers de URLs/transformaciones de Cloudinary
  layouts/Layout.astro  <head>, SEO, fuentes, script de paleta
  pages/                index.astro (portada) y predicas.astro
  components/           Una sección o pieza por fichero, con sus estilos dentro
  styles/global.css     Tokens (paletas, tipografía), base, utilidades (.btn, .panel, .eyebrow, .reveal…)
  env.d.ts              Tipos de las variables de entorno
  lib/*.test.ts          Tests de Vitest, al lado del fichero que prueban
public/                 Estáticos (favicon)
.github/workflows/ci.yml   Lint + test en GitHub Actions
eslint.config.js           Config de ESLint (incluye .astro)
vitest.config.ts           Config de Vitest
studio/                     Sanity Studio: app aparte, con su propio package.json (ver más abajo)
```

`pages/*.astro` solo **ordenan secciones**. La lógica y el marcado viven en los componentes; los datos, en `data/` y `lib/`.

## Datos y fuentes externas

| Dato | Fuente | Variable | Sin configurar |
|---|---|---|---|
| Prédicas | RSS de Spotify for Creators | `SPOTIFY_RSS_URL` | datos de ejemplo |
| Testimonios | Sanity, documentos `testimonio` | `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_TOKEN` | Cloudinary por etiqueta |
| | Cloudinary (vídeos con una etiqueta) | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_TESTIMONIOS_TAG` | datos de ejemplo |
| Hero (fondo, textos, botones, promo) | Sanity, singleton `portada` (`lib/portada.ts`) | `SANITY_PROJECT_ID` | `site.hero` |
| Lema (titular, pie, banda de frases) | Sanity, singleton `lema` (`lib/lema.ts`) | `SANITY_PROJECT_ID` | `site.lema` |
| Domingo (hora, dirección, qué esperar) | Sanity, singleton `domingo` (`lib/domingo.ts`) | `SANITY_PROJECT_ID` | `site.domingo` |
| Jóvenes | Sanity, singleton `jovenes` (`lib/jovenes.ts`) | `SANITY_PROJECT_ID` | `site.jovenes` |
| Contacto | Sanity, singleton `contacto` (`lib/contacto.ts`) | `SANITY_PROJECT_ID` | `site.contacto` |
| Prédicas, enlaces (Spotify/Apple) | Sanity, singleton `predicasEnlaces` (`lib/predicasEnlaces.ts`) | `SANITY_PROJECT_ID` | `site.predicas` |
| Versículo | Sanity, singleton `versiculo` (`lib/versiculo.ts`) | `SANITY_PROJECT_ID` | `site.versiculo` |
| Quiénes somos (esencia) | Sanity, singleton `esencia` (`lib/esencia.ts`) | `SANITY_PROJECT_ID` | `site.esencia` |
| Aviso legal (`/legal`) | Sanity, singleton `legal` (`lib/legal.ts`) | `SANITY_PROJECT_ID` | `site.legal` (con `[HUECOS]`) |
| Política de privacidad (`/privacidad`) | Sanity, singleton `privacidad` (`lib/privacidad.ts`) | `SANITY_PROJECT_ID` | `site.privacidad` (con `[HUECOS]`) |

El **nav** (`site.nav`) se queda fijo en código a propósito: son las anclas/rutas del propio sitio, no contenido editorial.

Copia `.env.example` a `.env`. **Nunca subas `.env`.** Los campos de cada tipo de documento de Sanity están documentados en el comentario de cabecera de su fichero en `lib/` (y en el propio schema de `studio/`). El proyecto de Sanity es `na5c11mv` (dataset `production`, público: no hace falta token para leer).

### Sanity Studio (`studio/`)

App aparte dentro del mismo repo, con su propio `package.json` (no es un workspace de npm: se instala y se corre por separado). Desplegado en **https://ibncoruna.sanity.studio/** — ahí es donde se edita todo el contenido de la portada (hero, lema, domingo, jóvenes, contacto, prédicas, versículo, quiénes somos, testimonios), no hace falta tocar código para eso.

```bash
cd studio
npm install
npm run dev       # http://localhost:3333
npm run deploy    # publica los cambios de schema en https://ibncoruna.sanity.studio/
```

- Cada fichero de `schemaTypes/` define los mismos campos que lee su `lib/*.ts` correspondiente (mismo nombre: `domingo.ts` ↔ `domingo.ts`, etc.). Si cambias un campo en un lado, cámbialo en el otro.
- `portada`, `lema`, `domingo`, `jovenes`, `contacto`, `predicasEnlaces`, `versiculo`, `esencia`, `legal` y `privacidad` son **singletons**: `structure.ts` los abre siempre con `documentId` fijo (igual al nombre del tipo). No hace falta (ni se puede, desde la UI) crear un segundo documento de estos tipos.
- `testimonio` es la única colección normal; el orden de publicación lo decide Sanity (no hace falta campo de estado, a diferencia de lo que habría sido con Directus).

Reglas que hay que respetar:

1. **Todo se lee en el build** (en el frontmatter de Astro o en `lib/`), nunca desde el navegador. El sitio no tiene servidor ni secretos en el cliente. Contenido nuevo = reconstruir (cron semanal para el RSS, webhook de Sanity para lo demás).
2. **Una fuente configurada que falla rompe el build a propósito** (`throw`). Así se mantiene la versión publicada en vez de publicar una web vacía. No lo cambies por un `catch` silencioso.
   - Única excepción: los singletons de la portada (`portada`, `lema`, `domingo`, `jovenes`, `contacto`, `predicasEnlaces`, `versiculo`, `esencia`). Si el documento no existe todavía, la query de Sanity devuelve `null` (no un error) y se usa `site.ts`, porque son opcionales.
3. **Sin configuración, datos de ejemplo** marcados con `esEjemplo: true`, y la UI lo indica con una etiqueta discreta. No quites esa etiqueta.
4. Para una fuente nueva, sigue el mismo patrón:
   - Función `getX()` en `lib/` que devuelve `{ datos, esEjemplo }`.
   - Caché en módulo si se usa en varias páginas (ver `getPredicas`).
   - Tipos explícitos y variable tipada en `env.d.ts` y `.env.example`.
   - Tests con Vitest de las partes puras (parseo, formateo, transformación de URLs) en `*.test.ts`.
5. **Prédicas por RSS, no por la API de Spotify:** el RSS no necesita credenciales y trae el MP3, que reproduce `AudioPlayer.astro`.
6. **URLs de Cloudinary:** se optimizan siempre con los helpers de `lib/cloudinary.ts` (`q_auto`, `f_auto`, póster desde fotograma). No construyas transformaciones a mano en los componentes.

## Idiomas (gallego y español)

El sitio es bilingüe: **español** es el idioma principal (rutas sin prefijo: `/`, `/predicas`) y **gallego** vive bajo `/gl/` (`/gl/`, `/gl/predicas`), configurado en `astro.config.mjs` (`i18n.routing.prefixDefaultLocale: false`).

- **`src/pages/gl/`** duplica cada página de `src/pages/` (mismos componentes, misma composición) porque Astro enruta i18n por carpetas. Si añades o quitas una sección en una, hazlo también en la otra — son solo orden de componentes, no llevan textos.
- **Dentro de un componente**, `Astro.currentLocale` ya dice en qué idioma se está renderizando; no hace falta pasarlo por props.
- **Textos fijos del código** (botones, menú, preguntas del FAQ, formulario…): en `src/i18n/ui.ts`, un diccionario `{ es, gl }` por clave. Se usa con `useTranslations(Astro.currentLocale)` → `t('clave')`; con variables, la clave es una función `(arg) => \`...${arg}...\``.
- **Enlaces internos**: con `localizedHref(Astro.currentLocale, '/ruta')` (añade `/gl` si toca). Para el selector de idioma, `switchLocaleHref` calcula la misma página en el otro idioma a partir de `Astro.url.pathname`.
- **Contenido de Sanity** (hero, domingo, jóvenes, versículo, quiénes somos…): cada campo de texto traducible tiene un hermano `<campo>Gl` opcional (ver `lib/*.ts` y `studio/schemaTypes/*.ts`). Vacío, la versión en gallego usa el español; si tampoco hay nada en Sanity, usa `site.ts` (que solo está en español — por eso **nunca** dupliques `site.ts` en gallego, es el valor de respaldo mientras no haya contenido real).
- **Fechas** (`formatFecha` en `lib/predicas.ts`, mes en `EpisodeCover.astro`): reciben `Astro.currentLocale` y usan el tag de `Intl` (`es-ES` / `gl-ES`) correspondiente.
- Las traducciones al gallego de `ui.ts` y de los textos de ejemplo son una primera versión hecha por el agente, no por un hablante nativo: que alguien de la iglesia las revise antes de que el sitio se use de verdad en gallego.

## Contenido y huecos

- Los datos que la iglesia aún no ha dado van **entre corchetes**: `[HORA]`, `[DIRECCIÓN]`, `[NOMBRE]`…
- **No inventes** horarios, direcciones, nombres, testimonios, cifras ni títulos de prédicas. Si falta un dato, deja el hueco.
- Los textos fijos se editan en `site.ts` o directamente en el componente si son de una sola sección. No los conviertas en props sin necesidad.

## Identidad visual (obligatorio)

**Voz**
- **Siempre de tú**, en castellano, cercano, también con los mayores.
- Hablar de Jesús «con palabras de todos los días».
- Evitar lenguaje que solo entiende quien ya va a una iglesia («se convoca a los fieles al servicio dominical») y los mensajes fríos, institucionales o solemnes.

**Nombre**
- «Buenas Noticias» es el nombre de uso.
- «IBN» nunca va solo: siempre «IBN Coruña».
- La cuenta de jóvenes es «Jóvenes IBN Coruña».

**Lema**
- Principal: «Hay buenas noticias. Solo tienes que venir.»
- Alternativos: «Ven como eres», «Tu familia de la fe», «Fe de verdad, gente de verdad».

**Estética prohibida:** vidrieras, letras góticas, cruces como adorno, imaginería religiosa típica.

**Logo:** `Logo.astro` usa el logo real (`src/assets/logo-blue.png` y `logo-white.png`, optimizados por Astro a WebP en el build). Prop `tone="blue"` (por defecto, fondos claros) o `tone="white"` (fondos oscuros: footer, menú móvil).

**La ola** (`Wave.astro`) es el trazo de la firma.
- Sirve para subrayar, separar o acompañar.
- **Nunca** sustituye al logo.

**Tipografía**
- Montserrat (variable) en titulares, botones y etiquetas.
- Lora (variable) para lectura. Merriweather o Nunito están pendientes de que decida la directiva.
- Ambas van **self-hosted con `@fontsource-variable`**. No uses el CDN de Google Fonts (rendimiento y RGPD).

**Color**
- Tres paletas candidatas: A Atlántico, B Bandera, C Ría de noche. Se eligen con `data-palette="a|b|c"` en `<html>`.
- Usa **solo los tokens** de `global.css`:

| Token | Uso |
|---|---|
| `--bg` | Fondo blanco |
| `--surface`, `--surface-strong` | Velos de bruma |
| `--band` | Azul protagonista |
| `--deep` | Azul profundo |
| `--warm` | Acento cálido |
| `--btn` | Fondo de botón con texto blanco |
| `--accent` | Texto de acento sobre claro |
| `--line`, `--muted` | Líneas y texto secundario |

- **Nunca pongas hexadecimales sueltos** en los componentes. Las excepciones son `#fff` y el selector de paleta.
- La base es **blanca**. El usuario descartó el fondo beige: `--sand` existe como token de marca, pero **no se usa como fondo**.

**Contraste**
- Texto ≥ 4.5:1; texto grande (≥ 24 px, o ≥ 18.66 px en negrita) ≥ 3:1.
- En la paleta B, el blanco sobre `--band` (#0099CC) da 3.3:1. Por eso el texto pequeño blanco va sobre `--deep` o `--btn`, nunca sobre `--band`.
- Si añades una combinación nueva, compruébala en las tres paletas.

**Fotos**
- Momentos reales, sin posar y con luz natural; nada de stock.
- Ciudad y mar, a dos tonos (`duotone` / `dosTonos`). Personas, a color natural.
- **Niños siempre sin caras.**
- Mientras no haya fotos se usa `Photo.astro` sin `src` (hueco etiquetado) o la ilustración `SeaScene.astro`.

## Convenciones de código

- **Idioma**
  - Comentarios, textos de UI, README y mensajes de commit en **castellano**.
  - Los identificadores del dominio están en castellano porque reflejan los campos de Sanity y del contenido (`predicas`, `titulo`, `fecha`, `getTestimonios`). Mantén la coherencia con el fichero que tocas.
- **CSS**
  - **Tailwind v4** (vía `@tailwindcss/vite`), con utilidades directamente en el `class` del marcado. Sin librerías de componentes UI.
  - `global.css` define los tokens de marca como custom properties (paletas, tipografía, radios) y los expone a Tailwind con `@theme inline` para que utilidades como `bg-deep`, `text-warm` o `rounded-xl` lean de esos mismos tokens y respeten el cambio de paleta en vivo. Los patrones repetidos en muchas secciones (`.btn`, `.eyebrow`, `.lead`, `.display-*`, `.panel`, `.container`) viven en `@layer components` dentro de `global.css`.
  - `--radius-l` se deja fuera de `@theme` a propósito (choca con la utilidad direccional `rounded-l` de Tailwind); se usa como `rounded-[var(--radius-l)]`.
  - Queda un `<style>` con ámbito de Astro por componente solo para lo que Tailwind no expresa como utilidad: `@keyframes`, `::details-content`, `:popover-open` / `@starting-style`, y gradientes largos de varias capas. Si se puede escribir como clase de utilidad (incluido con valores arbitrarios `[...]`), va en el `class`, no en `<style>`.
  - Para estilar un hijo de otro componente, pásale la clase por prop (`class`/`class:list`) en vez de usar `:global(.clase)` desde el padre.
  - Layout con flex/grid y `gap`. Tipografía fluida con `clamp()` en valores arbitrarios (`text-[clamp(...)]`), `text-wrap: balance` en titulares.
- **JavaScript: el mínimo.** Antes de escribir JS, busca la solución nativa:
  - Popover API para el menú, `<details name>` para el acordeón.
  - `animation-timeline` para las animaciones de scroll, envuelto en `@supports` y `prefers-reduced-motion: no-preference`.
  - Solo llevan script `AudioPlayer`, `Testimonios`, `PaletteSwitcher`, `Nav` (cerrar el menú y el idioma), `PrivacidadAviso` y el vídeo del hero.
- **Movimiento:** toda animación respeta `prefers-reduced-motion`. El vídeo del hero tampoco arranca con «ahorro de datos».
- **Accesibilidad**
  - Elementos reales: `<button>`, `<a href>`, `<label>`. Nunca `onclick` en un `<div>`.
  - `aria-label` en botones de solo icono; `aria-hidden="true"` en SVG decorativos.
  - Áreas táctiles ≥ 44 px.
  - Un solo `<h1>` por página.
- **Dependencias:** hoy son `astro`, `tailwindcss` + `@tailwindcss/vite`, `@sanity/client`, las dos fuentes de fuentes tipográficas y `fast-xml-parser`; en desarrollo, `vitest`, `eslint` + `eslint-plugin-astro` + `typescript-eslint`. Justifica cualquier dependencia nueva; si lo resuelven 30 líneas propias, mejor eso.
- **Rutas internas:** con `/` delante (`/#contacto`, `/predicas`) para que funcionen desde cualquier página. La navegación sale de `site.nav`, que alimenta el menú y el pie.

## Cómo añadir cosas

- **Una sección nueva**
  1. Crea un componente en `components/` con su `<section id=… aria-labelledby=…>`.
  2. Usa `.container`, `.eyebrow` y `.display-l` para la cabecera, y `.reveal` para la aparición.
  3. Colócalo en `pages/index.astro`.
  4. Si va en el menú, añádelo a `site.nav`.
- **Una página nueva:** `pages/x.astro` con `Layout`, `Nav current="/x"`, `Footer`, y `AudioPlayer` si reproduce prédicas.
- **Una fuente de datos nueva:** ver «Datos y fuentes externas», punto 4.

## Antes de dar por terminado un cambio

1. `npm run lint` y `npm run test` sin errores. Si tocaste una función de `lib/`, tiene (o actualizaste) su test.
2. `npm run build` termina sin errores.
3. Lo has visto en escritorio (1440 px) y en móvil (390 px), y en las tres paletas si toca colores (`?paleta=a|b|c`).
4. Si toca datos, has probado con y sin variables de entorno. Sin ellas deben salir los datos de ejemplo.
5. No has inventado contenido ni roto ninguna regla de identidad.
6. Si cambia el uso o la configuración, el README está actualizado.

## Git

- Commits en castellano, en imperativo y concisos (`Añade sección de testimonios`).
- **Sin líneas `Co-Authored-By`** ni otras atribuciones de IA en commits o PRs.
- No hagas commit ni push si no te lo piden.
- Nunca subas `.env`, `dist/`, `.astro/` ni `node_modules/` (ya están en `.gitignore`).
- no hacer nunca un push sin autorización
- primero consultas si parece bien el commit

## Pendiente conocido

- Datos entre corchetes en `site.ts`.
- Trazo real de la ola (`Wave.astro` sigue con el trazo provisional).
- Fotos y vídeo del hero.
- Envío del formulario «Planifica tu visita» (`site.contacto.formAction`). El aviso legal y la política de privacidad ya tienen página propia (`/legal`, `/privacidad`), editable desde Sanity.
- Contenido real de los documentos de Sanity (el schema y el webhook de rebuild ya están listos): `testimonio`, `portada`, `lema`, `domingo`, `jovenes`, `contacto`, `predicasEnlaces`, `versiculo`, `esencia`, `legal`, `privacidad` (estos dos últimos tienen de momento texto de ejemplo con `[HUECOS]`, pendiente de que la iglesia dé el texto real: razón social, CIF, domicilio).
- Decisión de la directiva sobre la letra de lectura (paleta ya decidida: Atlántico, `defaultPalette: 'a'`, selector apagado).
- Dominio definitivo en `astro.config.mjs`. 