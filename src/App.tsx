import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import './index.css';
import Cover from './components/Cover';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Countdown from './components/Countdown';
// import Story from './components/Story';
// import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import Location from './components/Location';
// import RSVP from './components/RSVP';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import Cursor from './components/Cursor';
import { weddingConfig } from './config/wedding';
import {
  gsap,
  ScrollTrigger,
  SplitText,
  SIGNATURE_EASE,
  hasFinePointer,
  prefersReducedMotion,
} from './lib/motion';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isCovered, setIsCovered] = useState(true);
  const siteRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = weddingConfig.seo.title;
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', isCovered);
    return () => document.body.classList.remove('is-locked');
  }, [isCovered]);

  useEffect(() => {
    if (!hasEntered) return;

    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
    };
  }, [hasEntered]);

  /* La portada bloquea el scroll: al salir, recalculamos los puntos de anclaje. */
  useEffect(() => {
    if (isCovered) return;

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [isCovered]);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
  }, []);

  const handleExited = useCallback(() => {
    setIsCovered(false);
    window.setTimeout(() => {
      mainRef.current?.focus({ preventScroll: true });
    }, 120);
  }, []);

  useGSAP(
    () => {
      const reducedMotion = prefersReducedMotion();

      const initialTargets =
        '[data-hero], [data-reveal], [data-reveal-scale], [data-stagger] > *, [data-split], [data-split-chars], .hero__letter, .word__inner';

      if (!hasEntered) {
        gsap.set(initialTargets, { opacity: 0 });
        return;
      }

      if (reducedMotion) {
        gsap.set(initialTargets, { clearProps: 'all' });
        return;
      }

      const cleanups: Array<() => void> = [];

      /* ---------- Entrada del hero ---------- */
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '[data-hero]',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.09,
            delay: 0.1,
          },
          0,
        )
        .fromTo(
          '.hero__letter',
          { y: '0.55em', opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.6,
            ease: SIGNATURE_EASE,
            stagger: 0.05,
          },
          0.18,
        );

      /* ---------- Titulares partidos por líneas (SplitText) ---------- */
      const splits: SplitText[] = [];

      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((element) => {
        if (element.dataset.split === 'done') return;

        gsap.set(element, { opacity: 1 });

        const split = SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 118,
              opacity: 0,
              duration: 1.15,
              ease: SIGNATURE_EASE,
              stagger: 0.1,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true,
              },
            }),
        });

        element.dataset.split = 'done';
        splits.push(split);
      });

      cleanups.push(() => {
        splits.forEach((split) => {
          split.kill();
          split.revert();
        });
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((element) => {
          delete element.dataset.split;
        });
      });

      /* ---------- Firma del footer: los nombres suben letra a letra ---------- */
      const charSplits: SplitText[] = [];

      gsap.utils.toArray<HTMLElement>('[data-split-chars]').forEach((element) => {
        if (element.dataset.splitChars === 'done') return;

        gsap.set(element, { opacity: 1 });

        const split = SplitText.create(element, {
          type: 'chars',
          mask: 'chars',
          charsClass: 'split-char',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 118,
              opacity: 0,
              duration: 1.05,
              ease: SIGNATURE_EASE,
              stagger: 0.028,
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true,
              },
            }),
        });

        element.dataset.splitChars = 'done';
        charSplits.push(split);
      });

      cleanups.push(() => {
        charSplits.forEach((split) => {
          split.kill();
          split.revert();
        });
        gsap.utils
          .toArray<HTMLElement>('[data-split-chars]')
          .forEach((element) => {
            delete element.dataset.splitChars;
          });
      });

      /* ---------- Apariciones al hacer scroll ---------- */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-scale]').forEach(
        (element) => {
          gsap.fromTo(
            element,
            { y: 48, opacity: 0, scale: 0.965 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.25,
              ease: SIGNATURE_EASE,
              scrollTrigger: {
                trigger: element,
                start: 'top 84%',
                once: true,
              },
            },
          );
        },
      );

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((container) => {
        gsap.fromTo(
          Array.from(container.children),
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: SIGNATURE_EASE,
            stagger: 0.09,
            scrollTrigger: {
              trigger: container,
              start: 'top 86%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((container) => {
        gsap.fromTo(
          container.querySelectorAll('.word__inner'),
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: SIGNATURE_EASE,
            stagger: 0.035,
            scrollTrigger: {
              trigger: container,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              once: true,
            },
          },
        );
      });

      /* ---------- Manifiesto: la frase se entinta mientras se lee ---------- */
      const manifesto = document.querySelector<HTMLElement>('.manifesto');
      const manifestoWords = gsap.utils.toArray<HTMLElement>(
        '.manifesto__quote .word__inner',
      );

      if (manifesto && manifestoWords.length) {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1000px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: manifesto,
              start: 'top top',
              end: '+=40%',
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            manifestoWords,
            { color: 'rgba(27, 33, 29, 0.5)' },
            {
              color: 'rgba(27, 33, 29, 1)',
              ease: 'none',
              stagger: 0.32,
            },
            0,
          );
        });

        /* En móvil no se fija la sección: la tinta avanza con el pulgar. */
        mm.add('(max-width: 999.98px)', () => {
          gsap.fromTo(
            manifestoWords,
            { color: 'rgba(27, 33, 29, 0.5)' },
            {
              color: 'rgba(27, 33, 29, 1)',
              ease: 'none',
              stagger: 0.5,
              scrollTrigger: {
                trigger: manifesto,
                start: 'top 82%',
                end: 'bottom 68%',
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        cleanups.push(() => mm.revert());
      }

      /* ---------- Parallax ---------- */
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const distance = Number(element.dataset.parallax ?? 10);

        gsap.fromTo(
          element,
          { yPercent: -distance / 2 },
          {
            yPercent: distance / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      /* ---------- Ramas dibujadas (DrawSVG) ---------- */
      gsap.utils.toArray<SVGSVGElement>('[data-draw]').forEach((svg) => {
        gsap.fromTo(
          svg.querySelectorAll('path'),
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration: 2.2,
            ease: 'power2.inOut',
            stagger: 0.06,
            scrollTrigger: {
              trigger: svg,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });

      /* ---------- Hero con profundidad al hacer scroll ---------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#inicio',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
        .to('.hero__card-wrap', { yPercent: -14, rotate: -1.5, ease: 'none' }, 0)
        .to('.hero__names', { yPercent: -7, ease: 'none' }, 0)
        .to('.hero__watermark', { yPercent: 18, rotate: 5, ease: 'none' }, 0)
        .to('.hero__inner', { opacity: 0.15, ease: 'none' }, 0.35);

      /* ---------- Deriva ambiental del ampersand ---------- */
      gsap.to('.hero__watermark', {
        xPercent: -1.6,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      /* ---------- Barra de progreso ---------- */
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.3,
        },
      });

      /* ---------- Magnetismo y tilt (solo cursor fino) ---------- */
      if (hasFinePointer()) {
        gsap.utils.toArray<HTMLElement>('.button').forEach((button) => {
          button.classList.add('is-magnetic');

          const moveX = gsap.quickTo(button, 'x', {
            duration: 0.5,
            ease: 'power3.out',
          });
          const moveY = gsap.quickTo(button, 'y', {
            duration: 0.5,
            ease: 'power3.out',
          });

          const handleMove = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            moveX((event.clientX - (rect.left + rect.width / 2)) * 0.16);
            moveY((event.clientY - (rect.top + rect.height / 2)) * 0.22);
          };

          const handleLeave = () => {
            moveX(0);
            moveY(0);
          };

          button.addEventListener('pointermove', handleMove);
          button.addEventListener('pointerleave', handleLeave);

          cleanups.push(() => {
            button.classList.remove('is-magnetic');
            button.removeEventListener('pointermove', handleMove);
            button.removeEventListener('pointerleave', handleLeave);
          });
        });

        const cardWrap = document.querySelector<HTMLElement>('.hero__card-wrap');
        const cardShell =
          document.querySelector<HTMLElement>('.hero__card-shell');

        if (cardWrap && cardShell) {
          gsap.set(cardShell, {
            transformPerspective: 1100,
            transformOrigin: 'center center',
          });

          const rotateX = gsap.quickTo(cardShell, 'rotationX', {
            duration: 0.7,
            ease: 'power3.out',
          });
          const rotateY = gsap.quickTo(cardShell, 'rotationY', {
            duration: 0.7,
            ease: 'power3.out',
          });

          const handleTilt = (event: PointerEvent) => {
            const rect = cardWrap.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            rotateX(-y * 7);
            rotateY(x * 9);
          };

          const resetTilt = () => {
            rotateX(0);
            rotateY(0);
          };

          cardWrap.addEventListener('pointermove', handleTilt);
          cardWrap.addEventListener('pointerleave', resetTilt);

          cleanups.push(() => {
            cardWrap.removeEventListener('pointermove', handleTilt);
            cardWrap.removeEventListener('pointerleave', resetTilt);
          });
        }
      }

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: siteRef, dependencies: [hasEntered] },
  );

  return (
    <div className={`site ${isCovered ? 'is-covered' : 'is-ready'}`} ref={siteRef}>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <Cursor />

      <div className="site__page" aria-hidden={isCovered} inert={isCovered}>
        <main id="contenido" ref={mainRef} tabIndex={-1}>
          <Hero />
          <Manifesto />
          <Countdown />
          {/* Sección de historia desactivada por ahora. */}
          {/* <Story /> */}
          {/* Galería desactivada por ahora. */}
          {/* <Gallery /> */}
          <EventDetails />
          <Location />
          {/* Sección de confirmación desactivada: no habrá RSVP. */}
          {/* <RSVP /> */}
        </main>
        <Footer />
      </div>

      <Cover onEnter={handleEnter} onExited={handleExited} />

      {!isCovered && <AudioPlayer />}
    </div>
  );
}

export default App;
