import { ArrowUp, Botanical } from './Decor';
import { weddingConfig } from '../config/wedding';

const Footer = () => {
  const { couple, wedding } = weddingConfig;

  return (
    <footer className="footer">
      <div className="page footer__inner" data-reveal>
        <div className="footer__top">
          <span className="footer__monogram">{couple.monogram}</span>
          <span className="footer__hashtag">{wedding.yearRoman}</span>
        </div>

        <p className="footer__names" data-split-chars>
          <span className="footer__name">{couple.firstName}</span>{' '}
          <em>&amp;</em>{' '}
          <span className="footer__name">{couple.secondName}</span>
        </p>

        <p className="footer__date">
          {wedding.dateShort} · {wedding.city}
        </p>

        <p className="footer__note">
          Gracias por acompañarnos en este día tan especial.
        </p>

        <Botanical className="footer__branch" data-draw />

        <div className="footer__bottom">
          <span>Con amor, nuestras familias</span>
          <a href="#inicio" data-cursor="Inicio">
            <span>Volver al inicio</span>
            <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
