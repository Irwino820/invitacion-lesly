import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { weddingConfig } from '../config/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

const getTimeLeft = (target: number): TimeLeft => {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    isToday: false,
  };
};

/** Cada unidad rueda en la dirección del cambio, como un contador mecánico. */
const CountdownNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || previous.current === value) return;

    const direction = value > previous.current ? 1 : -1;
    previous.current = value;

    if (prefersReducedMotion()) return;

    gsap.killTweensOf(element);
    gsap.fromTo(
      element,
      { yPercent: 55 * direction, opacity: 0, filter: 'blur(4px)' },
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
      },
    );
  }, [value]);

  return (
    <span className="countdown__number" aria-hidden="true" ref={ref}>
      {String(value).padStart(2, '0')}
    </span>
  );
};

const Countdown = () => {
  const target = useMemo(
    () => new Date(weddingConfig.wedding.dateISO).getTime(),
    [],
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [target]);

  const units = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  const label = timeLeft.isToday
    ? 'Hoy es el gran día'
    : `Faltan ${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`;

  const footNote = timeLeft.isToday
    ? 'Hoy es el gran día'
    : `Faltan ${timeLeft.days} ${timeLeft.days === 1 ? 'día' : 'días'} para celebrar`;

  const { wedding } = weddingConfig;

  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <div className="page">
        <div className="countdown__head" data-reveal>
          <p className="section-tag">02 · Cuenta regresiva</p>
          <div className="countdown__title-row">
            <h2 id="countdown-title" className="display display--md" data-split>
              El tiempo pasa <em>volando</em>
            </h2>
            <p className="countdown__note">
              Nos vemos el <strong>{wedding.dateLabel}</strong> en{' '}
              {wedding.city}. Mientras tanto, cuenta los días con nosotros.
            </p>
          </div>
        </div>

        <div
          className="countdown__clock"
          role="group"
          aria-label={label}
          data-stagger
        >
          {units.map((unit) => (
            <div className="countdown__unit" key={unit.label}>
              <CountdownNumber value={unit.value} />
              <span className="countdown__label" aria-hidden="true">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="countdown__foot" data-reveal>
          <span className="countdown__foot-note">{footNote}</span>
          <span className="countdown__foot-rule" aria-hidden="true" />
          <span className="countdown__foot-date">{wedding.dateShort}</span>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
