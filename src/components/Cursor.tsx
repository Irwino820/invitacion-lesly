import { useEffect, useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion';

/**
 * Cursor de firma: un punto que acompaña al puntero y un anillo que lo sigue
 * con retardo. Sobre enlaces y botones el anillo crece y, si el elemento trae
 * `data-cursor`, muestra una etiqueta. Solo se activa con puntero fino y sin
 * movimiento reducido; en táctil se conserva el cursor nativo.
 */
const Cursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !label) return;

    const html = document.documentElement;
    html.classList.add('has-custom-cursor');
    root.classList.add('is-active');

    gsap.set([dot, ring, label], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.14, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.14, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const labelX = gsap.quickTo(label, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const labelY = gsap.quickTo(label, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    });

    let current: HTMLElement | null = null;
    let visible = false;

    const scaleFor = (element: HTMLElement | null) =>
      element ? (element.dataset.cursor ? 2.05 : 1.55) : 1;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    };

    const hide = () => {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.25, ease: 'power2.out' });
    };

    const onMove = (event: PointerEvent) => {
      show();
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      labelX(event.clientX);
      labelY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = (
        event.target as HTMLElement | null
      )?.closest<HTMLElement>('a, button, [data-cursor]');
      if (!target || target === current) return;

      current = target;
      const text = target.dataset.cursor ?? '';

      label.textContent = text;
      gsap.to(ring, {
        scale: scaleFor(target),
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        scale: text ? 0 : 0.35,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(label, {
        opacity: text ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onOut = (event: PointerEvent) => {
      if (!current) return;
      const related = event.relatedTarget as Node | null;
      if (related && current.contains(related)) return;

      current = null;
      label.textContent = '';
      gsap.to(ring, { scale: 1, duration: 0.5, ease: 'power3.out' });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      gsap.to(label, { opacity: 0, duration: 0.25, ease: 'power2.out' });
    };

    const onDown = () => {
      gsap.to(ring, {
        scale: scaleFor(current) * 0.78,
        duration: 0.18,
        ease: 'power2.out',
      });
    };

    const onUp = () => {
      gsap.to(ring, {
        scale: scaleFor(current),
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      html.classList.remove('has-custom-cursor');
      root.classList.remove('is-active');
      gsap.killTweensOf([root, dot, ring, label]);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true" ref={rootRef}>
      <div className="cursor__ring" ref={ringRef} />
      <div className="cursor__dot" ref={dotRef} />
      <span className="cursor__label" ref={labelRef} />
    </div>
  );
};

export default Cursor;
