const photos = [
  {
    src: '/photos/ceremonia-forestal.jpg',
    alt: 'Arco de ceremonia al aire libre con velo blanco entre árboles',
    label: 'La ceremonia',
    index: 'I',
    className: 'gallery__item--a',
  },
  {
    src: '/photos/jardin-mesa.jpg',
    alt: 'Mesa vestida de verde bosque con candelabro dorado y flores blancas',
    label: 'La mesa',
    index: 'II',
    className: 'gallery__item--b',
  },
  {
    src: '/photos/ramo-jardin.jpg',
    alt: 'Ramo de novia con flores blancas y eucalipto sobre una silla de mimbre',
    label: 'El ramo',
    index: 'III',
    className: 'gallery__item--c',
  },
  {
    src: '/photos/mesa-detalle.jpg',
    alt: 'Detalle de mesa con velas flotantes, menú y listón de seda',
    label: 'Los detalles',
    index: 'IV',
    className: 'gallery__item--d',
  },
  {
    src: '/photos/manos-detalle.jpg',
    alt: 'Manos de la novia y el novio entrelazadas con anillo de compromiso',
    label: 'El sí',
    index: 'V',
    className: 'gallery__item--e',
  },
];

const Gallery = () => (
  <section id="galeria" className="gallery" aria-labelledby="gallery-title">
    <div className="page">
      <header className="gallery__head">
        <p className="section-tag" data-reveal>
          03 · Galería
        </p>
        <div className="gallery__title-row">
          <h2 id="gallery-title" className="display display--md" data-reveal>
            Instantes que <em>anticipan</em> el sí
          </h2>
          <p className="gallery__intro" data-reveal>
            Imágenes de referencia que nos inspiran para este día: luz cálida,
            flores sencillas y sobremesa larga.
          </p>
        </div>
      </header>

      <div className="gallery__grid">
        {photos.map((photo) => (
          <figure
            className={`gallery__item ${photo.className}`}
            key={photo.src}
            data-reveal
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={933}
              height={1400}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="gallery__caption">
              <span className="gallery__caption-index" aria-hidden="true">
                {photo.index}
              </span>
              <span>{photo.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="gallery__credit" data-reveal>
        Fotografía de referencia ·{' '}
        <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
          Pexels
        </a>
      </p>
    </div>
  </section>
);

export default Gallery;
