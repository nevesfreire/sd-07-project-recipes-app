import React from 'react';
import PropTypes from 'prop-types';

import Actions from './Actions';

function Info({ data }) {
  const {
    name,
    src,
    category,
    instructions,
    ingredients,
    video,
    alcoholic,
  } = data;

  return (
    <>
      <header>
        <main>
          <p data-testid="recipe-title">{name}</p>
        </main>
        <img
          data-testid="recipe-photo"
          alt="thumbnail"
          src={ src }
          width="100px"
        />
        <p data-testid="recipe-category">
          {category}
          {alcoholic && ' | Alcoholic'}
        </p>
        <p data-testid="instructions">
          {instructions}
        </p>
        <ul>
          {ingredients.map((ing, index) => (
            <li
              key={ ing }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ing}
            </li>
          ))}
        </ul>
        <video
          width="200"
          height="200"
          controls
          data-testid="video"
          src={ video }
        >
          <track kind="captions" />
        </video>
      </header>
      <section>
        <Actions data={ data } />
      </section>
    </>
  );
}

Info.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    video: PropTypes.string.isRequired,
    alcoholic: PropTypes.bool.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
};

export default Info;
