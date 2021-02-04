import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneCard({ recipe, index }) {
  const {
    name,
    image,
    type,
    alcoholicOrNot,
    category,
    area,
    id,
    doneDate,
    tags,
  } = recipe;
  console.log(recipe);
  const [showCopied, setShowCopied] = useState(false);

  const renderTopText = () => {
    if (type === 'comida') {
      return (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${area} - ${category}` }
        </p>
      );
    }
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
    );
  };

  const copyLink = () => {
    const granted = 'granted';
    const prompt = 'prompt';
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === granted || result.state === prompt) {
        navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
      }
    }).then(setShowCopied(true));
  };

  const choosePath = () => {
    if (type === 'comida') {
      return `/comidas/${id}`;
    }
    return `/bebidas/${id}`;
  };

  const path = choosePath();

  return (
    <div>
      <a href={ path }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </a>
      <a href={ path }>
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </h3>
      </a>
      <div>
        { renderTopText() }
        <button type="button" onClick={ copyLink }>
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        { showCopied && <p>Link copiado!</p> }
        <h4 data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</h4>
        <p
          data-testid={ `${index}-${tags[0]}-horizontal-tag` }
        >
          { tags[0] }
        </p>
        <p
          data-testid={ `${index}-${tags[1]}-horizontal-tag` }
        >
          { tags[1] }
        </p>
      </div>
    </div>
  );
}

DoneCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.shape().isRequired,
  }).isRequired,
};
