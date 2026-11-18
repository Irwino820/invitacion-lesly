import { weddingConfig } from '../config/wedding';

type Listener = (playing: boolean) => void;

const TARGET_VOLUME = 0.34;

const listeners = new Set<Listener>();
let element: HTMLAudioElement | null = null;
let fadeFrame: number | null = null;
let fadeTimer: number | null = null;

const notify = () => {
  const playing = Boolean(element && !element.paused);
  listeners.forEach((listener) => listener(playing));
};

const ensureElement = () => {
  if (element) return element;

  element = new Audio(weddingConfig.audio.src);
  element.loop = true;
  element.preload = 'auto';
  element.volume = 0;
  element.addEventListener('play', notify);
  element.addEventListener('pause', notify);
  element.addEventListener('ended', notify);

  return element;
};

const cancelFade = () => {
  if (fadeFrame !== null) {
    cancelAnimationFrame(fadeFrame);
    fadeFrame = null;
  }

  if (fadeTimer !== null) {
    window.clearTimeout(fadeTimer);
    fadeTimer = null;
  }
};

/**
 * Cross-fades the volume. The timeout is a safety net: some browsers throttle
 * requestAnimationFrame (background tabs, hidden windows), and the fade must
 * still finish so the audio never gets stuck at zero volume.
 */
const fadeTo = (target: number, duration: number, onDone?: () => void) => {
  const audio = ensureElement();
  cancelFade();

  const from = audio.volume;
  const start = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    cancelFade();
    audio.volume = target;
    onDone?.();
  };

  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    audio.volume = Math.min(1, Math.max(0, from + (target - from) * eased));

    if (progress < 1) {
      fadeFrame = requestAnimationFrame(step);
    } else {
      finish();
    }
  };

  fadeFrame = requestAnimationFrame(step);
  fadeTimer = window.setTimeout(finish, duration + 120);
};

/** Starts the song. Must be called from a user gesture (the envelope click). */
export const playMusic = () => {
  const audio = ensureElement();

  if (!audio.paused) {
    // A stop fade may be in progress: bring the volume back up.
    fadeTo(TARGET_VOLUME, 900);
    return Promise.resolve(true);
  }

  return audio
    .play()
    .then(() => {
      fadeTo(TARGET_VOLUME, 1800);
      return true;
    })
    .catch(() => {
      // The browser blocked playback or the file failed: keep the UI in sync.
      notify();
      return false;
    });
};

export const stopMusic = () => {
  const audio = ensureElement();

  fadeTo(0, 500, () => {
    audio.pause();
    notify();
  });
};

export const toggleMusic = () => {
  const audio = ensureElement();
  if (audio.paused) return playMusic();

  stopMusic();
  return Promise.resolve(false);
};

export const isMusicPlaying = () => Boolean(element && !element.paused);

export const subscribeMusic = (listener: Listener) => {
  listeners.add(listener);
  listener(isMusicPlaying());
  return () => {
    listeners.delete(listener);
  };
};
