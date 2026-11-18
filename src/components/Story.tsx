import { Botanical } from './Decor';
import { weddingConfig } from '../config/wedding';

const Story = () => {
  const { story } = weddingConfig;

  return (
    <section id="historia" className="story" aria-labelledby="story-title">
      <div className="page story__grid">
        <div className="story__aside">
          <p className="section-tag" data-reveal>
            03 · Nuestra historia
          </p>
          <h2 id="story-title" className="display display--md" data-reveal>
            Todo empezó <em>sin prisa</em>
          </h2>
          <p className="story__note" data-reveal>
            Tres capítulos, una misma certeza: queremos seguir caminando
            juntos.
          </p>
          <Botanical className="story__branch" />
        </div>

        <ol className="story__list">
          {story.map((chapter, index) => (
            <li className="chapter" key={chapter.year} data-reveal>
              <span className="chapter__year">{chapter.year}</span>
              <div className="chapter__body">
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </div>
              <span className="chapter__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Story;
