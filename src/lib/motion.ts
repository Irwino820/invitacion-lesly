import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);

/** Salida larga y suave, con una desaceleración de firma. */
export const SIGNATURE_EASE = CustomEase.create(
  'signature',
  'M0,0 C0.16,1 0.3,1 1,1',
);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Solo apunta a dispositivos con cursor fino: el tilt y el magnetismo no tienen sentido en táctil. */
export const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, SplitText };
