import { describe, expect, it } from 'vitest';
import { esCloudinary, optimizarImagen, optimizarVideo, posterDeVideo, transformar } from './cloudinary';

describe('esCloudinary', () => {
  it('reconoce una URL de Cloudinary', () => {
    expect(esCloudinary('https://res.cloudinary.com/demo/video/upload/v1/clip.mp4')).toBe(true);
  });

  it('no confunde una URL externa cualquiera', () => {
    expect(esCloudinary('https://ejemplo.com/video.mp4')).toBe(false);
  });
});

describe('transformar', () => {
  it('inserta la transformación justo después de /upload/', () => {
    expect(transformar('https://res.cloudinary.com/demo/image/upload/v1/foto.jpg', 'w_200')).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200/v1/foto.jpg',
    );
  });
});

describe('optimizarVideo', () => {
  it('añade q_auto,vc_auto y fuerza la extensión .mp4', () => {
    expect(optimizarVideo('https://res.cloudinary.com/demo/video/upload/v1/clip.mov')).toBe(
      'https://res.cloudinary.com/demo/video/upload/q_auto,vc_auto/v1/clip.mp4',
    );
  });

  it('combina las transformaciones extra pedidas', () => {
    expect(optimizarVideo('https://res.cloudinary.com/demo/video/upload/v1/clip.mp4', 'w_1280')).toBe(
      'https://res.cloudinary.com/demo/video/upload/q_auto,vc_auto,w_1280/v1/clip.mp4',
    );
  });
});

describe('optimizarImagen', () => {
  it('añade f_auto,q_auto', () => {
    expect(optimizarImagen('https://res.cloudinary.com/demo/image/upload/v1/foto.png')).toBe(
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/foto.png',
    );
  });
});

describe('posterDeVideo', () => {
  it('saca un fotograma y lo deja en .jpg', () => {
    expect(posterDeVideo('https://res.cloudinary.com/demo/video/upload/v1/clip.mp4')).toBe(
      'https://res.cloudinary.com/demo/video/upload/so_1,c_fill,ar_9:16,w_600,q_auto,f_jpg/v1/clip.jpg',
    );
  });
});
