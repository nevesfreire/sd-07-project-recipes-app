import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import copyLink from '../../services/clipBoard';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteCard({ recipe, index, setFavorites }) {
  const { name, image, type, alcoholicOrNot, category, area, id } = recipe;
  const [showCopied, setShowCopied] = useState(false);
  const { disfavor } = useContext(RecipesContext);

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

  const shareLink = async () => {
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
        <button
          type="button"
          onClick={ () => {
            setFavorites((prevState) => prevState.filter((item) => item.id !== id));
            disfavor(id);
          } }
        >
          <img
            src={ blackHeartIcon }
            alt="heart"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
      { showCopied && <p>Link copiado!</p> }
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
