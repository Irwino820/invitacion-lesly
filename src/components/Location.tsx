import { ArrowUpRight, MapArt } from './Decor';
import { weddingConfig } from '../config/wedding';

const Location = () => {
  const { venue, celebration, wedding } = weddingConfig;

  return (
    <section id="lugar" className="place" aria-labelledby="place-title">
      <div className="page">
        <header className="place__head">
          <div data-reveal>
            <p className="section-tag">04 · El lugar</p>
            <h2 id="place-title" className="display display--md" data-split>
              Un rincón para <em>celebrar</em>
            </h2>
          </div>
          <p className="place__intro" data-reveal>
            La celebración será en la casa del novio, en Carboneras, Tepezalá.
            Ahí te esperamos para compartir este día con nosotros.
          </p>
        </header>

        <div className="place__grid">
          <figure className="place__art" data-reveal>
            <div className="place__art-shell">
              <div className="place__art-inner" data-parallax="5">
                <MapArt
                  venue={venue.address}
                  topLabel="Carboneras"
                  area="TEPEZALÁ · AGUASCALIENTES"
                  region="AGS · MX"
                />
              </div>
            </div>
            <figcaption className="place__art-caption">
              Plano ilustrado · no a escala
            </figcaption>
          </figure>

          <div className="place__info">
            <div data-reveal>
              <span className="place__label">Celebración</span>
              <p className="place__house">{venue.name}</p>
              <h3 className="place__venue">{venue.address}</h3>
              <p className="place__address">{venue.city}</p>
            </div>

            <p className="place__note" data-reveal>
              {venue.note}
            </p>

            <div className="place__actions" data-reveal>
              <a
                className="button button--primary"
                href={venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Mapa"
              >
                <span>Cómo llegar</span>
                <span className="button__icon" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>

              <a
                className="button button--ghost"
                href={venue.calendarUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Agenda"
              >
                <span>Agregar al calendario</span>
                <span className="button__icon" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
            </div>

            <div className="place__foot" data-reveal>
              <span className="place__label">El día</span>
              <p>
                {wedding.weekday} {wedding.dateLabel}
                <br />
                {celebration.label} {celebration.time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
