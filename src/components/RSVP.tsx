import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight } from './Decor';
import { weddingConfig } from '../config/wedding';

type Attendance = 'yes' | 'no' | '';

type RsvpError = {
  field: 'name' | 'attendance';
  message: string;
} | null;

const RSVP = () => {
  const { couple, rsvp, gifts } = weddingConfig;
  const whatsappNumber = rsvp.whatsappNumber.replace(/\D/g, '');
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<RsvpError>(null);
  const [sent, setSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const choiceRef = useRef<HTMLFieldSetElement>(null);

  const contactUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hola, tengo una duda sobre la boda de ${couple.firstName} & ${couple.secondName}.`,
  )}`;

  const buildMessage = () => {
    const count = Number(guests);
    const reply =
      attendance === 'yes'
        ? `Con gusto confirmo mi asistencia a la boda de ${couple.firstName} & ${couple.secondName} para ${count} ${
            count === 1 ? 'persona' : 'personas'
          }.`
        : `Les escribo para avisar que no podré acompañarlos en su boda.`;

    const note = message.trim() ? `\n\n${message.trim()}` : '';

    return `Hola, soy ${name.trim()}.\n${reply}${note}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(false);

    if (!name.trim()) {
      setError({
        field: 'name',
        message: 'Escribe tu nombre para saber quién nos acompaña.',
      });
      nameRef.current?.focus();
      return;
    }

    if (!attendance) {
      setError({
        field: 'attendance',
        message: 'Selecciona si podrás acompañarnos.',
      });
      choiceRef.current?.focus();
      return;
    }

    setError(null);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      buildMessage(),
    )}`;

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setSent(true);
  };

  return (
    <section id="rsvp" className="rsvp" aria-labelledby="rsvp-title">
      <div className="page rsvp__grid">
        <div className="rsvp__intro">
          <p className="section-tag" data-reveal>
            07 · Confirmación
          </p>
          <h2 id="rsvp-title" className="display display--md" data-reveal>
            Confirma tu <em>asistencia</em>
          </h2>
          <p className="rsvp__text" data-reveal>
            {rsvp.note}
          </p>

          <div className="rsvp__deadline" data-reveal>
            <span>Antes del</span>
            <strong>{rsvp.deadlineLabel}</strong>
          </div>

          <p className="rsvp__contact" data-reveal>
            ¿Tienes alguna duda?{' '}
            <a href={contactUrl} target="_blank" rel="noreferrer">
              Escríbenos por WhatsApp
            </a>
          </p>

          <div className="rsvp__gift" data-reveal>
            <span className="rsvp__gift-label">Un detalle</span>
            <h3>{gifts.title}</h3>
            <p>{gifts.text}</p>
          </div>
        </div>

        <div className="rsvp__form-wrap" data-reveal>
          <div className="rsvp__shell">
            <div className="rsvp__panel">
              <div className="rsvp__panel-head">
                <span className="rsvp__panel-label">RSVP</span>
                <span className="rsvp__panel-monogram">{couple.monogram}</span>
              </div>

              <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="rsvp-name">Nombre y apellido</label>
                  <input
                    ref={nameRef}
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Escribe tu nombre"
                    value={name}
                    onChange={(event) => {
                      const value = event.target.value;
                      setName(value);
                      if (error?.field === 'name' && value.trim()) {
                        setError(null);
                      }
                    }}
                    aria-invalid={error?.field === 'name'}
                    aria-describedby={error ? 'rsvp-error' : undefined}
                  />
                </div>

                <fieldset
                  className="choice"
                  ref={choiceRef}
                  tabIndex={-1}
                  aria-invalid={error?.field === 'attendance'}
                  aria-describedby={error ? 'rsvp-error' : undefined}
                >
                  <legend>¿Nos acompañas?</legend>
                  <div className="choice__options">
                    <label
                      className={`choice__option ${
                        attendance === 'yes' ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={attendance === 'yes'}
                        onChange={() => {
                          setAttendance('yes');
                          if (error?.field === 'attendance') setError(null);
                        }}
                      />
                      <span className="choice__control" aria-hidden="true">
                        <span />
                      </span>
                      <span className="choice__text">
                        <strong>Sí, estaré ahí</strong>
                        <small>No me lo perdería</small>
                      </span>
                    </label>

                    <label
                      className={`choice__option ${
                        attendance === 'no' ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={attendance === 'no'}
                        onChange={() => {
                          setAttendance('no');
                          if (error?.field === 'attendance') setError(null);
                        }}
                      />
                      <span className="choice__control" aria-hidden="true">
                        <span />
                      </span>
                      <span className="choice__text">
                        <strong>No podré asistir</strong>
                        <small>Los acompañaré en el corazón</small>
                      </span>
                    </label>
                  </div>
                </fieldset>

                {attendance === 'yes' && (
                  <div className="field field--select">
                    <label htmlFor="rsvp-guests">Número de asistentes</label>
                    <div className="select-wrap">
                      <select
                        id="rsvp-guests"
                        name="guests"
                        value={guests}
                        onChange={(event) => setGuests(event.target.value)}
                      >
                        {Array.from({ length: rsvp.maxGuests }, (_, index) => {
                          const value = String(index + 1);
                          return (
                            <option value={value} key={value}>
                              {value} {value === '1' ? 'persona' : 'personas'}
                            </option>
                          );
                        })}
                      </select>
                      <span className="select-wrap__arrow" aria-hidden="true">
                        ↓
                      </span>
                    </div>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="rsvp-message">
                    Un mensaje para los novios{' '}
                    <span className="field__optional">(opcional)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={3}
                    placeholder="Tu mensaje"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </div>

                {error && (
                  <p className="form-error" id="rsvp-error" role="alert">
                    {error.message}
                  </p>
                )}

                {sent && (
                  <p className="form-success" role="status">
                    Tu mensaje está listo en WhatsApp. Si no se abrió, revisa
                    que las ventanas emergentes estén permitidas.
                  </p>
                )}

                <button className="button button--dark button--wide" type="submit">
                  <span>Enviar por WhatsApp</span>
                  <span className="button__icon" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </button>

                <p className="rsvp__legal">
                  Se abrirá WhatsApp con tu mensaje listo para enviar. No
                  guardamos tus datos.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
