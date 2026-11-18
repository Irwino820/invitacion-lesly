import { ArrowUpRight, Botanical } from './Decor';
import { weddingConfig } from '../config/wedding';

const SplitLetters = ({ text }: { text: string }) => (
  <>
    {text.split('').map((char, index) => (
      <span className="hero__letter" key={`${char}-${index}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </>
);

const Hero = () => {
  const { couple, wedding, venue, celebration } = weddingConfig;

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <span className="hero__watermark" aria-hidden="true">
        &amp;
      </span>
      <span className="hero__rail" aria-hidden="true">
        Invitación · {wedding.yearRoman}
      </span>

      <div className="hero__inner page">
        <div className="hero__topline" data-hero>
          <span>{wedding.cityShort}</span>
          <span className="hero__topline-rule" aria-hidden="true" />
          <span>{wedding.dateShort}</span>
        </div>

        <div className="hero__grid">
          <div className="hero__lead">
            <p className="section-tag hero__tag" data-hero>
              Nos casamos por el civil
            </p>

            <h1
              className="hero__names"
              id="hero-title"
              aria-label={`${couple.firstName} y ${couple.secondName}`}
            >
              <span className="hero__name" aria-hidden="true">
                <SplitLetters text={couple.firstName} />
              </span>
              <span className="hero__amp-row" data-hero aria-hidden="true">
                <span className="hero__amp-rule" />
                <span className="hero__amp">&amp;</span>
                <span className="hero__amp-rule" />
              </span>
              <span
                className="hero__name hero__name--second"
                aria-hidden="true"
              >
                <SplitLetters text={couple.secondName} />
              </span>
            </h1>

            <p className="hero__intro" data-hero>
              {wedding.intro}
            </p>

            <div className="hero__actions" data-hero>
              <a className="button button--primary" href="#lugar" data-cursor="Lugar">
                <span>Cómo llegar</span>
                <span className="button__icon" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
              <a className="link-underline" href="#dia">
                Ver los detalles
              </a>
            </div>

            <div className="hero__meta" data-hero>
              <div>
                <span className="hero__meta-label">{celebration.label}</span>
                <span className="hero__meta-value">
                  {celebration.time} · {venue.name}
                </span>
              </div>
              <div>
                <span className="hero__meta-label">Lugar</span>
                <span className="hero__meta-value">
                  {venue.address}, {wedding.cityShort}
                </span>
              </div>
            </div>
          </div>

          <div className="hero__card-wrap" data-hero>
            <div className="hero__card-shell">
              <div className="hero__card-inner">
                <span className="hero__card-eyebrow">Save the date</span>

                <div className="hero__card-date">
                  <span className="hero__card-day">{wedding.cardDay}</span>
                  <span className="hero__card-date-side">
                    <span className="hero__card-month">
                      {wedding.cardMonth}
                    </span>
                    <span className="hero__card-year">{wedding.cardYear}</span>
                  </span>
                </div>

                <span className="hero__card-rule" aria-hidden="true" />

                <p className="hero__card-when">
                  {wedding.weekday}
                  <span>{wedding.timeLabel}</span>
                </p>

                <p className="hero__card-place">
                  {venue.name}
                  <span>{wedding.cityShort}</span>
                </p>

                <Botanical className="hero__card-botanical" />

                <span className="hero__card-monogram">{couple.monogram}</span>
              </div>
            </div>

            <div className="hero__seal" aria-hidden="true">
              <span>{couple.monogram}</span>
              <span className="hero__seal-year">{wedding.cardYear}</span>
            </div>
          </div>
        </div>

        <div className="hero__footer" data-hero>
          <a className="scroll-cue" href="#dia">
            <span className="scroll-cue__line" aria-hidden="true" />
            <span>Desliza para descubrir</span>
          </a>
          <span className="hero__footer-note">
            {celebration.label} · {wedding.cityShort}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
