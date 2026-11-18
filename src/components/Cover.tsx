import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Botanical } from './Decor';
import { weddingConfig } from '../config/wedding';
import { playMusic } from '../lib/music';

interface CoverProps {
  /** Fires when the card starts becoming the page behind it. */
  onEnter: () => void;
  /** Fires when the opening animation has fully finished. */
  onExited: () => void;
}

const Cover = ({ onEnter, onExited }: CoverProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const opened = useRef(false);
  const { couple, wedding } = weddingConfig;

  const handleOpen = () => {
    if (opened.current) return;
    opened.current = true;
    setIsOpening(true);

    // The click is the user gesture that unlocks audio playback.
    void playMusic();

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      onEnter();
      setIsGone(true);
      onExited();
      return;
    }

    const card = cardRef.current;
    let approach = { x: 0, y: 0, scale: 6 };

    if (card) {
      // Measure the card once it reaches its apex, then reset before the
      // timeline paints so the approach can be computed per viewport.
      gsap.set(card, { x: 0, y: 0, scale: 1, yPercent: -56 });
      const rect = card.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      approach = {
        x: viewportWidth / 2 - (rect.left + rect.width / 2),
        y: viewportHeight / 2 - (rect.top + rect.height / 2) - 5,
        scale:
          Math.max(viewportWidth / rect.width, viewportHeight / rect.height) *
          1.08,
      };

      gsap.set(card, { yPercent: 0 });
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setIsGone(true);
        onExited();
      },
    });

    timeline
      .to(
        '.cover__seal',
        { scale: 1.22, opacity: 0, duration: 0.38, ease: 'power2.in' },
        0,
      )
      .to(
        actionsRef.current,
        { y: 10, opacity: 0, duration: 0.35, ease: 'power2.in' },
        0,
      )
      .to(headRef.current, { opacity: 0.28, duration: 0.6 }, 0.2)
      .to(
        flapRef.current,
        { rotateX: -116, duration: 1, ease: 'power3.inOut' },
        0.15,
      )
      .set(flapRef.current, { zIndex: 0 }, 0.86)
      .to(
        flapRef.current,
        { opacity: 0, duration: 0.3, ease: 'power1.in' },
        0.9,
      )
      .to(
        envelopeRef.current,
        { y: -5, duration: 1.2, ease: 'power2.out' },
        0.15,
      )
      .to(
        card,
        { yPercent: -56, duration: 1, ease: 'power3.out' },
        0.85,
      )
      // The card clears the pocket, advances toward the camera and its
      // ivory surface becomes the paper of the page underneath.
      .set(card, { zIndex: 6 }, 1.85)
      .set(stageRef.current, { zIndex: 7 }, 1.85)
      .to(
        card,
        {
          x: approach.x,
          y: approach.y,
          scale: approach.scale,
          duration: 0.95,
          ease: 'power2.in',
        },
        1.85,
      )
      .to(
        '.cover__card-content',
        { y: -18, opacity: 0, duration: 0.5, ease: 'power2.in' },
        1.95,
      )
      .to(
        '.cover__card-surface',
        { opacity: 1, duration: 0.6, ease: 'power2.inOut' },
        2.15,
      )
      .to(
        '.cover__branch',
        { opacity: 0, duration: 0.7, ease: 'power2.inOut' },
        1.9,
      )
      .add(() => onEnter(), 2.2)
      .to(
        rootRef.current,
        { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
        2.88,
      )
      .set(rootRef.current, { pointerEvents: 'none' }, 3.32);
  };

  if (isGone) return null;

  return (
    <div
      ref={rootRef}
      className={`cover ${isOpening ? 'is-opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-title"
      aria-describedby="cover-date"
      aria-busy={isOpening}
    >
      <div className="cover__frame" aria-hidden="true">
        <div className="cover__frame-inner" />
      </div>

      <Botanical className="cover__branch cover__branch--left" />
      <Botanical className="cover__branch cover__branch--right" />

      <header className="cover__head" ref={headRef}>
        <span className="cover__head-monogram">{couple.monogram}</span>
        <span className="cover__head-kicker">Invitación privada</span>
        <span className="cover__head-rule" aria-hidden="true" />
      </header>

      <div className="cover__stage" ref={stageRef}>
        <div className="cover__envelope" ref={envelopeRef}>
          <div className="cover__shadow" aria-hidden="true" />
          <div className="cover__back" aria-hidden="true" />

          <div className="cover__card" ref={cardRef}>
            <span className="cover__card-surface" aria-hidden="true" />
            <span
              className="cover__card-border cover__card-border--gold"
              aria-hidden="true"
            />
            <span
              className="cover__card-border cover__card-border--sage"
              aria-hidden="true"
            />

            <div className="cover__card-content">
              <span className="cover__card-kicker">Invitación privada</span>
              <span className="cover__card-monogram">{couple.monogram}</span>
              <p className="cover__card-eyebrow">Nos casamos por el civil</p>
              <p id="cover-title" className="cover__card-names">
                <span>{couple.firstName}</span>
                <span className="cover__card-amp">&amp;</span>
                <span>{couple.secondName}</span>
              </p>
              <p id="cover-date" className="cover__card-date">
                {wedding.cardDateLabel}
              </p>
              <span className="cover__card-rule" aria-hidden="true" />
              <p className="cover__card-place">{wedding.cityShort}</p>
              <p className="cover__card-note">Una carta para ti</p>
            </div>
          </div>

          <div className="cover__pocket" aria-hidden="true">
            <svg
              className="cover__folds"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 3 50 52 100 3" />
              <path d="M0 97 50 54 100 97" />
              <path d="M3 0 50 52 3 100" />
              <path d="M97 0 50 52 97 100" />
            </svg>
            <div className="cover__label">
              <span className="cover__label-monogram">{couple.monogram}</span>
              <span className="cover__label-rule" />
              <span className="cover__label-text">{wedding.yearRoman}</span>
            </div>
          </div>

          <div className="cover__flap" ref={flapRef} aria-hidden="true">
            <div className="cover__flap-face" />
            <svg
              className="cover__flap-edge"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0.5 0.5 50 99 99.5 0.5" />
            </svg>
          </div>

          <div className="cover__seal" aria-hidden="true">
            <span className="cover__seal-ring" />
            <span className="cover__seal-mono">{couple.monogram}</span>
          </div>
        </div>

        <div className="cover__actions" ref={actionsRef}>
          <button
            type="button"
            className="cover__open"
            onClick={handleOpen}
            disabled={isOpening}
            autoFocus
            data-cursor="Abrir"
          >
            <span>{isOpening ? 'Abriendo…' : 'Abrir invitación'}</span>
            <span className="cover__open-icon" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </button>
          <p className="cover__hint">Una carta para ti · Con música</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
