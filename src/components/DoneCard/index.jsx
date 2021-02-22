import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copyLink from '../../services/clipBoard';
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

  const shareLink = () => {
    copyLink(id, type);
    setShowCopied(true);
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
          width="250"
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
        <button type="button" onClick={ shareLink }>
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        { showCopied && <p>Link copiado!</p> }
        <h4 data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</h4>
        <p
          data-testid={ `${index}-${tags ? tags[0] : ''}-horizontal-tag` }
        >
          { tags ? tags[0] : '' }
        </p>
        <p
          data-testid={ `${index}-${tags ? tags[1] : ''}-horizontal-tag` }
        >
          { tags ? tags[1] : '' }
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
    doneDate: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
