import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const ArrowUpRight = ({ className = '', ...rest }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <path
      d="M5.4 14.6 14.6 5.4M7 5.4h7.6v7.6"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUp = ({ className = '', ...rest }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <path
      d="M10 16V4M5 9l5-5 5 5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** A single fine-line olive branch used as the recurring botanical motif. */
export const Botanical = ({ className = '', ...rest }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 220 340"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M112 336c0-52-1-98-6-142-5-44-13-84-8-122 3-26 10-48 22-64" />
      <path d="M108 262c-26-4-46-20-52-48 28 2 48 18 52 48Z" />
      <path d="M107 236c26-5 45-22 50-50-28 3-47 20-50 50Z" />
      <path d="M103 204c-23-5-40-20-44-44 24 2 41 17 44 44Z" />
      <path d="M101 178c23-6 39-23 43-48-24 3-40 19-43 48Z" />
      <path d="M96 148c-20-5-34-18-38-39 21 2 35 16 38 39Z" />
      <path d="M94 124c20-6 34-21 37-43-21 3-34 17-37 43Z" />
      <path d="M100 86c-15-5-25-16-27-32 16 2 26 13 27 32Z" />
      <path d="M103 66c15-6 25-19 26-37-16 4-25 16-26 37Z" />
      <path d="M111 36c-7-7-9-16-4-26 8 4 11 13 4 26Z" />
      <path d="M124 12c2-9 9-14 18-14-1 9-7 14-18 14Z" />
      <circle cx="63" cy="233" r="2.2" />
      <circle cx="148" cy="199" r="2.2" />
      <circle cx="52" cy="174" r="1.8" />
      <circle cx="136" cy="144" r="1.8" />
    </g>
  </svg>
);

interface MapArtProps {
  venue: string;
  /** Etiqueta superior izquierda del plano. */
  topLabel: string;
  /** Línea bajo el nombre del lugar. */
  area: string;
  /** Etiqueta inferior derecha. */
  region: string;
}

/** Corona de laurel de línea fina; se dibuja con DrawSVG alrededor del monograma. */
export const Wreath = ({ className = '', ...rest }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
    {...rest}
  >
    <g
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M60 98A38 38 0 0 1 43.94 25.56" />
      <path d="M60 98A38 38 0 0 0 76.06 25.56" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(50.16 96.71) rotate(195)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(41.58 93.24) rotate(209)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(34.08 87.79) rotate(223)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(28.13 80.7) rotate(237)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(24.07 72.37) rotate(251)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(22.14 63.31) rotate(265)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(22.47 54.06) rotate(279)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(25.02 45.15) rotate(293)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(29.65 37.13) rotate(307)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(36.09 30.47) rotate(321)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(43.94 25.56) rotate(335)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(69.84 96.71) rotate(165)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(78.42 93.24) rotate(151)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(85.92 87.79) rotate(137)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(91.87 80.7) rotate(123)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(95.93 72.37) rotate(109)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(97.86 63.31) rotate(95)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(97.53 54.06) rotate(81)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(94.98 45.15) rotate(67)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(90.35 37.13) rotate(53)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(83.91 30.47) rotate(39)" />
      <path d="M0 0c3.2-2.4 5-6.2 4.6-10.5-3.8 1.9-6.2 6.1-4.6 10.5Z" transform="translate(76.06 25.56) rotate(25)" />
    </g>
  </svg>
);


/** Editorial site-plan illustration — decorative, with the real map linked nearby. */
export const MapArt = ({ venue, topLabel, area, region }: MapArtProps) => (
  <svg
    className="map-art"
    viewBox="0 0 620 480"
    fill="none"
    aria-hidden="true"
  >
    <rect width="620" height="480" fill="#efe8dc" />

    <g stroke="#a9b3a5" strokeWidth="0.8" opacity="0.55">
      <path d="M-20 86c86 22 158 12 224-22s136-46 218-18 138 70 224 54" />
      <path d="M-20 132c96 20 170 8 236-26s130-40 206-16 134 64 214 52" />
      <path d="M-16 392c98-24 168-16 234 16s132 48 214 34 138-46 206-30" />
    </g>

    <g fill="#e3e5d9">
      <path d="M48 196h104v58H48z" />
      <path d="M176 176h82v48h-82z" />
      <path d="M286 196h56v66h-56z" />
      <path d="M432 162h118v72H432z" />
      <path d="M56 278h126v64H56z" />
      <path d="M214 288h70v46h-70z" />
      <path d="M352 270h82v58h-82z" />
      <path d="M466 282h92v54h-92z" />
      <path d="M112 372h96v48h-96z" />
      <path d="M288 356h72v56h-72z" />
      <path d="M466 362h104v50H466z" />
    </g>

    <g stroke="#cfc5b2" strokeWidth="0.8">
      <path d="M0 166h620" />
      <path d="M0 258h620" />
      <path d="M0 352h620" />
      <path d="M84 140v220" />
      <path d="M172 140v220" />
      <path d="M262 140v220" />
      <path d="M342 130v230" />
      <path d="M426 140v220" />
      <path d="M514 140v220" />
    </g>

    <g>
      <path
        d="M-10 318c102-6 170-34 244-44 92-12 156 16 232 6 70-10 112-34 164-34"
        stroke="#f9f5ed"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M-10 318c102-6 170-34 244-44 92-12 156 16 232 6 70-10 112-34 164-34"
        stroke="#bfb4a0"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M330 40c-8 102-4 178 22 250 16 44 38 88 58 144"
        stroke="#f9f5ed"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M330 40c-8 102-4 178 22 250 16 44 38 88 58 144"
        stroke="#bfb4a0"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </g>

    <path
      d="M116 430c58-8 94-20 132-48 34-26 46-56 68-78 20-20 51-29 94-28"
      stroke="#a98a54"
      strokeWidth="1.2"
      strokeDasharray="4 6"
      strokeLinecap="round"
    />
    <circle cx="116" cy="430" r="4" fill="#1e352b" />
    <circle
      className="map-art__halo"
      cx="410"
      cy="276"
      r="19"
      stroke="#a98a54"
      strokeWidth="1"
      fill="none"
    />
    <circle
      cx="410"
      cy="276"
      r="19"
      stroke="#a98a54"
      strokeWidth="1"
      fill="#f9f5ed"
    />
    <circle cx="410" cy="276" r="6.5" fill="#1e352b" />
    <path
      d="M410 238v-22M410 336v-22M372 276h-22M470 276h-22"
      stroke="#a98a54"
      strokeWidth="0.8"
      opacity="0.6"
    />

    <g fill="#1e352b">
      <text
        x="436"
        y="267"
        fontFamily="'Bodoni Moda', Didot, Georgia, serif"
        fontSize="17"
        letterSpacing="0"
      >
        {venue}
      </text>
      <text
        x="436"
        y="288"
        fontFamily="Jost, sans-serif"
        fontSize="8.5"
        letterSpacing="2"
        opacity="0.62"
      >
        {area}
      </text>
      <text
        x="40"
        y="50"
        fontFamily="Jost, sans-serif"
        fontSize="9"
        letterSpacing="4"
        opacity="0.48"
      >
        {topLabel}
      </text>
      <text
        x="516"
        y="440"
        fontFamily="Jost, sans-serif"
        fontSize="8.5"
        letterSpacing="2.6"
        opacity="0.45"
      >
        {region}
      </text>
    </g>

    <g>
      <path d="M520 54v34" stroke="#1e352b" strokeWidth="0.9" />
      <path
        d="m520 50 5 12h-10l5-12Z"
        fill="#1e352b"
        opacity="0.85"
      />
      <text
        x="520"
        y="104"
        textAnchor="middle"
        fontFamily="Jost, sans-serif"
        fontSize="8"
        letterSpacing="2"
        fill="#1e352b"
        opacity="0.7"
      >
        N
      </text>
    </g>

    <g opacity="0.5">
      <path d="M38 454h68" stroke="#1e352b" strokeWidth="0.8" />
      <path d="M38 450v8M106 450v8" stroke="#1e352b" strokeWidth="0.8" />
      <text
        x="118"
        y="458"
        fontFamily="Jost, sans-serif"
        fontSize="7.5"
        letterSpacing="1.6"
        fill="#1e352b"
      >
        1 KM
      </text>
    </g>
  </svg>
);
