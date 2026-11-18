# Lesly & Rogelio · Invitación de boda

Invitación de una sola página construida con Vite, React, TypeScript y GSAP. El diseño es editorial y sobrio: marfil cálido, verde bosque, dorado mate, tipografía Bodoni Moda + Jost, líneas finas y movimiento contenido. La experiencia abre con un sobre de papel que se sella con cera y da paso al hero; no hay barra de navegación.

Evento: **lunes 21 de diciembre de 2026, 5:00 p. m.**, celebración en la casa del novio, Álvaro Obregón #54, Carboneras, Tepezalá, Aguascalientes. La invitación anuncia únicamente la celebración.

## Requisitos

- Node.js 20.19 o superior (recomendado: 22 LTS)
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

La terminal mostrará la URL local (por defecto `http://localhost:5173`).

```bash
npm run build    # compila TypeScript y genera dist/
npm run preview  # sirve la versión de producción
npm run lint     # revisa el código con ESLint
```

## Personalización

Casi todo el contenido editable está en un solo archivo:

```text
src/config/wedding.ts
```

### Pareja y fecha

| Campo | Qué controla |
| --- | --- |
| `couple.firstName`, `couple.secondName` | Nombres cortos en portada, hero y footer. |
| `couple.brideFullName`, `couple.groomFullName` | Nombres completos; no se muestran, se conservan por si se necesitan. |
| `couple.monogram` | Monograma del sobre, la tarjeta, el sello de cera y el footer. |
| `wedding.dateISO` | Fecha y hora con zona horaria para la cuenta regresiva. |
| `wedding.weekday`, `dateLabel`, `dateShort` | Textos visibles de la fecha. |
| `wedding.cardDay`, `cardMonth`, `cardYear` | Piezas grandes de la tarjeta del hero y el sello. |
| `wedding.cardDateLabel` | Fecha de la tarjeta del sobre. |
| `wedding.yearRoman` | Año en números romanos (rail del hero, sobre y footer). |
| `wedding.timeLabel` | Hora que aparece en la tarjeta del hero. |
| `wedding.city`, `cityShort` | Ciudad completa y versión corta. |
| `wedding.quote` | Frase del manifiesto. |
| `wedding.intro` | Texto de bienvenida del hero. |

La cuenta regresiva usa `dateISO`. Si cambia la fecha, actualiza también `weekday`, `dateLabel`, `dateShort`, `cardDay`, `cardMonth`, `cardYear`, `cardDateLabel`, `yearRoman` y `timeLabel`.

### Lugar y celebración

- `venue`: `name`, `address`, `city`, `mapUrl`, `calendarUrl` y `note`.
- `celebration`: `label` y `time` de la celebración.
- `schedule`: lista de `{ time, label }` para el itinerario.
- `dayNote`: nota que acompaña el itinerario.

`mapUrl` es una búsqueda de Google Maps; reemplázala por la ubicación exacta si hace falta. `calendarUrl` abre Google Calendar con el evento precargado: sus fechas están en UTC (`20261221T230000Z/20261222T040000Z`), así que actualízalas si cambia el horario.

### Portada tipo sobre

La portada es un sobre en capas: cuerpo verde, tarjeta de invitación, bolsillo con pliegues dorados, solapa y sello de cera. Al pulsar **Abrir invitación**:

1. El sello se desvanece y la solapa gira.
2. La tarjeta sube, se despega del sobre y avanza hacia el frente hasta llenar la pantalla.
3. Su superficie de papel marfil se funde con el hero, que queda debajo como página navegable.

El acercamiento calcula la escala en tiempo real a partir del tamaño de la tarjeta y del viewport, de modo que cubre la pantalla completa en desktop, tablet y móvil. El texto de la tarjeta toma los nombres, la fecha y la ciudad de `wedding.ts`. La secuencia está en `src/components/Cover.tsx` y su estilo en la sección **3. Portada · el sobre** de `src/index.css`. Con `prefers-reduced-motion` la portada se cierra de inmediato, sin animación.

### Música

La canción empieza al pulsar **Abrir invitación**, aprovechando ese clic como gesto de usuario que desbloquea el audio en móviles. Suena en bucle, con un fundido de entrada, y hay un botón flotante abajo a la derecha para silenciarla o volver a activarla.

- `audio.src`: ruta del archivo dentro de `public/`. Por defecto `public/audio/simplemente-gracias.mp3`.
- `audio.title` y `audio.artist`: texto que aparece al pasar el cursor sobre el botón.
- La lógica está en `src/lib/music.ts` y el botón en `src/components/AudioPlayer.tsx`.

El archivo incluido está comprimido a 96 kbps (≈2.4 MB) para no castigar la carga en datos móviles. Si lo reemplazas, procura mantener un peso similar. El volumen objetivo (0.34) se ajusta en `src/lib/music.ts`.

### Animaciones

Los plugins de GSAP se registran en `src/lib/motion.ts`: **ScrollTrigger**, **SplitText**, **DrawSVGPlugin** y **CustomEase** (con una curva de firma reutilizable). Las animaciones se declaran con atributos `data-*` y se orquestan desde `src/App.tsx`:

| Atributo | Efecto |
| --- | --- |
| `data-hero` | Entrada escalonada del hero al abrir el sobre. |
| `data-reveal` | Aparición al hacer scroll (opacidad + desplazamiento). |
| `data-reveal-scale` | Aparición con escala, para el panel del gran día. |
| `data-stagger` | Anima los hijos en cascada (cuenta regresiva). |
| `data-split` | Parte el titular en líneas con máscaras (SplitText) y las revela una por una. |
| `data-words` | Revela la frase del manifiesto palabra por palabra. |
| `data-rule` | Dibuja una línea dorada de izquierda a derecha. |
| `data-draw` | Dibuja los trazos SVG de las ramas botánicas (DrawSVG). |
| `data-parallax` | Desplazamiento suave con el scroll; el valor es la intensidad. |

Además:

- Los nombres del hero entran letra por letra con desenfoque.
- El hero tiene profundidad: la tarjeta, los nombres y el ampersand se mueven a distintas velocidades al hacer scroll.
- Los botones son magnéticos y la tarjeta del hero se inclina en 3D con el cursor (solo en equipos con ratón).
- Una hairline dorada en la parte superior marca el progreso de lectura.
- La cuenta regresiva rueda en la dirección del cambio, como un contador mecánico.
- El marcador del mapa pulsa y los botones tienen un brillo al pasar el cursor.

Todo se desactiva con `prefers-reduced-motion`, y el magnetismo y el tilt solo se activan con cursor fino.

### Secciones desactivadas

La historia, la galería y la confirmación de asistencia están comentadas, no eliminadas, para poder reactivarlas más adelante:

- `src/components/Story.tsx` y su import en `src/App.tsx`.
- `src/components/Gallery.tsx` y su import en `src/App.tsx` (las fotos siguen en `public/photos/`).
- `src/components/RSVP.tsx` y su import en `src/App.tsx`.

Los datos que necesitan (`story`, `rsvp`, `gifts`) siguen en `src/config/wedding.ts`. Para volver a mostrarlas, descomenta el import y el componente en `App.tsx`; recuerda ajustar la numeración de las etiquetas de sección (`01` a `04` en el recorrido actual) si las reactivas en medio del recorrido.

El código de vestimenta también está comentado en la interfaz de `WeddingConfig`: no se muestra en la página.

### Galería de fotos (desactivada)

La galería editorial usa cinco fotografías de referencia descargadas de Pexels y optimizadas en local (sin enlaces al CDN). Están en `public/photos/` y se editan desde `src/components/Gallery.tsx`:

| Archivo | Foto de Pexels | Tema |
| --- | --- | --- |
| `ceremonia-forestal.jpg` | [40521635](https://www.pexels.com/photo/40521635/) | Arco de ceremonia entre árboles |
| `jardin-mesa.jpg` | [35985204](https://www.pexels.com/photo/35985204/) | Mesa verde con candelabro dorado |
| `ramo-jardin.jpg` | [38583488](https://www.pexels.com/photo/38583488/) | Ramo blanco sobre mimbre |
| `mesa-detalle.jpg` | [33964860](https://www.pexels.com/photo/33964860/) | Menú y velas en la mesa |
| `manos-detalle.jpg` | [39060713](https://www.pexels.com/photo/39060713/) | Manos con anillo de compromiso |

Las imágenes son orientativas y no representan a la pareja. Para usar fotos reales, reemplaza los archivos manteniendo una proporción vertical cercana a 3:4 y actualiza los `alt` y los textos de `Gallery.tsx`. La galería muestra un crédito visible a Pexels; ajústalo o retíralo cuando uses fotografía propia.

### SEO, Open Graph y URL del sitio

El archivo `index.html` contiene el título, la descripción y las etiquetas para WhatsApp, Facebook y X. Si cambian nombres o fecha, actualiza también:

- `<title>` y `<meta name="description">`
- `og:title`, `og:description`, `og:image:alt`
- `twitter:title`, `twitter:description`
- `public/og-boda.png` (imagen estática de 1200 × 630)
- `public/favicon.svg` (monograma)

La imagen social incluida aún corresponde al diseño de ejemplo. Reemplázala con los nombres y la fecha reales.

La URL absoluta se inyecta en tiempo de build con `VITE_SITE_URL`:

```bash
cp .env.example .env
```

```dotenv
VITE_SITE_URL=https://tu-dominio.com
```

Sin `https://` y sin barra final. Se usa para `canonical`, `og:url`, `og:image` y `twitter:image`. Reinicia el servidor después de cambiar el archivo `.env`. En producción, Vite mostrará una advertencia si la variable está vacía.

Después de desplegar, puedes refrescar la vista previa social con el [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) o el [Twitter Card Validator](https://cards-dev.twitter.com/validator).

## Despliegue

El proyecto es estático y se puede publicar en Vercel, Netlify, Cloudflare Pages o cualquier hosting que sirva archivos estáticos.

Configuración típica:

- Build command: `npm run build`
- Output directory: `dist`
- Variable de entorno: `VITE_SITE_URL=https://tu-dominio.com`

En Vercel: importa el repositorio, deja que detecte Vite y agrega `VITE_SITE_URL` en *Settings → Environment Variables*. Después del despliegue, asigna el dominio final y vuelve a desplegar si cambió la URL.

## Estructura

```text
public/
  audio/        Canción de la invitación (mp3 comprimido)
  favicon.svg
  og-boda.png
  photos/       Fotos de referencia de la galería (galería desactivada)
src/
  components/   Sobre, secciones, galería y arte SVG
  config/       Datos editables de la boda
  lib/          Plugins de GSAP (motion) y reproductor de música
  App.tsx       Estado de la portada, scroll lock y animaciones
  index.css     Sistema visual, responsive y accesibilidad
  main.tsx
index.html      Metadatos, fuentes y punto de entrada
vite.config.ts  Inyección de VITE_SITE_URL
```

## Accesibilidad y movimiento

- La portada tipo sobre bloquea el scroll y hace `inert` el contenido de fondo hasta abrirse.
- El botón de apertura recibe el foco al cargar; al terminar la animación el foco se mueve al contenido.
- La tarjeta del sobre usa los nombres como título accesible del diálogo y la fecha como descripción.
- Los enlaces y controles tienen estados de foco visibles.
- Se respeta `prefers-reduced-motion`: la apertura del sobre, las animaciones y el scroll suave se desactivan.

## Antes de publicar

1. Confirma la dirección exacta y el enlace de Google Maps (`venue.mapUrl`).
2. Verifica que el enlace de Google Calendar abra el evento en la fecha y hora correctas.
3. Revisa el itinerario (`schedule`) y la nota del día (`dayNote`).
4. Si reactivas la galería, sustituye las fotos de referencia de `public/photos/` por fotografía propia.
5. Actualiza `public/og-boda.png` con los nombres y la fecha reales.
6. Configura `VITE_SITE_URL` con el dominio final.
7. Prueba la música en un teléfono real: debe empezar al abrir el sobre y poder silenciarse con el botón flotante.
8. Verifica la vista previa del enlace en WhatsApp y en las redes que uses.

## Notas

- No hay formulario ni backend: la página no recopila datos de invitados.
- Las fotos de `public/photos/` son referencias de Pexels, no imágenes de la pareja, y no se muestran mientras la galería esté desactivada.
- No hay analítica ni cookies.
- Las tipografías se cargan desde Google Fonts.
# invitacion-lesly
