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
      <img
        data-testid="recipe-photo"
        className="detail__image"
        alt="thumbnail"
        src={ src }
      />
      <div style={ { padding: '15px 30px' } }>
        <div className="detail__header">
          <div>
            <p
              data-testid="recipe-title"
              className="detail__title"
            >
              {name}
            </p>
            <p
              data-testid="recipe-category"
              className="detail__category"
            >
              {category}
              {alcoholic && ' | Alcoholic'}
            </p>
          </div>
          <Actions data={ data } />
        </div>
        <p className="detail__field">Ingredientes:</p>
        <ul className="detail__box">
          {ingredients.map((ing, index) => (
            <li
              key={ ing }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`- ${ing}`}
            </li>
          ))}
        </ul>
        <p className="detail__field">Instruções:</p>
        <p data-testid="instructions" className="detail__box">
          {instructions}
        </p>
        {video !== '' && (
          <iframe
            className="detail__video"
            data-testid="video"
            title="video"
            src={ `https://www.youtube.com/embed/${video.split('=')[1]}` }
          />
        )}
      </div>
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
