import { describe, expect, it } from 'vitest';
import { formatFecha, parseRss } from './predicas';

const rss = (items: string) => `<?xml version="1.0"?>
<rss><channel>
  <itunes:image href="https://ejemplo.com/portada.jpg" />
  ${items}
</channel></rss>`;

describe('parseRss', () => {
  it('lee los campos de un episodio y ordena de más reciente a más antiguo', () => {
    const items = rss(`
      <item>
        <guid>1</guid>
        <title>Primera prédica</title>
        <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
        <itunes:duration>2534</itunes:duration>
        <itunes:summary>Resumen &amp; algo más.</itunes:summary>
        <enclosure url="https://ejemplo.com/1.mp3" />
        <link>https://open.spotify.com/episode/1</link>
      </item>
      <item>
        <guid>2</guid>
        <title>Segunda prédica</title>
        <pubDate>Sun, 08 Nov 2026 11:00:00 GMT</pubDate>
        <itunes:duration>45:00</itunes:duration>
        <description>&lt;p&gt;Con etiquetas&lt;/p&gt;&lt;br&gt;y saltos.</description>
      </item>
    `);

    const predicas = parseRss(items);

    expect(predicas).toHaveLength(2);
    // La más reciente (8 de noviembre) va primero.
    expect(predicas[0].titulo).toBe('Segunda prédica');
    expect(predicas[1].titulo).toBe('Primera prédica');
  });

  it('convierte la duración en segundos y en hh:mm:ss a minutos', () => {
    const [p] = parseRss(
      rss(`
        <item>
          <guid>1</guid>
          <title>Prédica</title>
          <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
          <itunes:duration>2534</itunes:duration>
        </item>
      `),
    );
    expect(p.duracion).toBe('42 min');

    const [p2] = parseRss(
      rss(`
        <item>
          <guid>1</guid>
          <title>Prédica</title>
          <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
          <itunes:duration>1:05:00</itunes:duration>
        </item>
      `),
    );
    expect(p2.duracion).toBe('1 h 5 min');
  });

  it('limpia las etiquetas y entidades HTML de la descripción', () => {
    const [p] = parseRss(
      rss(`
        <item>
          <guid>1</guid>
          <title>Prédica</title>
          <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
          <description>&lt;p&gt;Hola &amp; bienvenido&lt;/p&gt;&lt;br/&gt;Fin.</description>
        </item>
      `),
    );
    expect(p.descripcion).toBe('Hola & bienvenido\n\nFin.');
  });

  it('usa la imagen del episodio si la tiene, si no la del canal', () => {
    const [p] = parseRss(
      rss(`
        <item>
          <guid>1</guid>
          <title>Con imagen propia</title>
          <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
          <itunes:image href="https://ejemplo.com/episodio.jpg" />
        </item>
      `),
    );
    expect(p.imagen).toBe('https://ejemplo.com/episodio.jpg');

    const [sinImagen] = parseRss(
      rss(`
        <item>
          <guid>1</guid>
          <title>Sin imagen propia</title>
          <pubDate>Sun, 01 Nov 2026 11:00:00 GMT</pubDate>
        </item>
      `),
    );
    expect(sinImagen.imagen).toBe('https://ejemplo.com/portada.jpg');
  });

  it('devuelve un array vacío si no hay canal', () => {
    expect(parseRss('<rss></rss>')).toEqual([]);
  });
});

describe('formatFecha', () => {
  it('formatea la fecha en castellano, con el mes en letras', () => {
    expect(formatFecha(new Date('2026-11-08T11:00:00'))).toBe('8 de noviembre de 2026');
  });
});
