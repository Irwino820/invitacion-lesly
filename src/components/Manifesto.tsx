import { Fragment } from 'react';
import { Wreath } from './Decor';
import { weddingConfig } from '../config/wedding';

const Manifesto = () => {
  const { couple, wedding } = weddingConfig;
  const words = wedding.quote.split(' ');

  return (
    <section className="manifesto" aria-label="Nuestra promesa">
      <div className="page manifesto__inner">
        <span className="manifesto__index" aria-hidden="true">
          01
        </span>
        <div className="manifesto__body">
          <blockquote className="manifesto__quote" data-words>
            <p>
              {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span className="word">
                    <span className="word__inner">{word}</span>
                  </span>{' '}
                </Fragment>
              ))}
            </p>
            <span className="manifesto__rule" data-rule aria-hidden="true" />
          </blockquote>

          <p className="manifesto__aside" data-reveal>
            {wedding.quoteSupport}
          </p>
        </div>
        <span className="manifesto__signature" data-reveal>
          <Wreath className="manifesto__wreath" data-draw />
          <span className="manifesto__monogram">{couple.monogram}</span>
        </span>
      </div>
    </section>
  );
};

export default Manifesto;
