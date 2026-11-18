import { ArrowUpRight, Botanical } from './Decor';
import { weddingConfig } from '../config/wedding';

const EventDetails = () => {
  const { wedding, venue, celebration, schedule, dayNote } = weddingConfig;

  return (
    <section id="dia" className="day" aria-labelledby="day-title">
      <Botanical className="day__branch" data-draw data-parallax="8" />
      <div className="page">
        <header className="day__head">
          <p className="section-tag section-tag--light" data-reveal>
            03 · El gran día
          </p>
          <div className="day__title-row">
            <h2 id="day-title" className="display display--lg" data-split>
              Nuestra <em>celebración</em>
            </h2>
            <p className="day__date" data-reveal>
              <span>{wedding.weekday}</span>
              <strong>{wedding.dateLabel}</strong>
              <span>{wedding.city}</span>
            </p>
          </div>
        </header>

        <div className="day__shell" data-reveal-scale>
          <div className="day__panel">
            <div className="day__events day__events--single">
              <article className="event event--single">
                <div className="event__lead">
                  <span className="event__index" aria-hidden="true">
                    I
                  </span>
                  <p className="event__label">{celebration.label}</p>
                  <p className="event__time">{celebration.time}</p>
                </div>
                <div className="event__body">
                  <p className="event__house">{venue.name}</p>
                  <h3>{venue.address}</h3>
                  <p className="event__address">{venue.city}</p>
                  <a
                    className="event__link"
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Ver ubicación</span>
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            </div>

            <div className="day__foot">
              <div className="day__schedule-group">
                <span className="day__foot-label">Itinerario</span>
                <div className="day__schedule" aria-label="Itinerario">
                  {schedule.map((item) => (
                    <div className="schedule__item" key={item.label}>
                      <span className="schedule__time">{item.time}</span>
                      <span className="schedule__label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="day__dress">
                <span className="day__foot-label">Importante</span>
                <span className="day__dress-note">{dayNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
