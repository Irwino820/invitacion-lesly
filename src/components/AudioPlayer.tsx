import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/wedding';
import { isMusicPlaying, subscribeMusic, toggleMusic } from '../lib/music';

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(isMusicPlaying);
  const { audio } = weddingConfig;

  useEffect(() => subscribeMusic(setPlaying), []);

  return (
    <button
      type="button"
      className={`audio ${playing ? 'is-playing' : ''}`}
      onClick={() => {
        void toggleMusic();
      }}
      aria-pressed={playing}
      aria-label={
        playing
          ? `Silenciar la música: ${audio.title}`
          : `Activar la música: ${audio.title}`
      }
    >
      <span className="audio__bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="audio__text" aria-hidden="true">
        <strong>{audio.title}</strong>
        <small>{audio.artist}</small>
      </span>
    </button>
  );
};

export default AudioPlayer;
