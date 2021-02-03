import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import removeFromFavorites from '../../services/localStorage';
import { RecipesContext } from '../../context';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteCard({ recipe, index }) {
  const { name, image, type, alcoholicOrNot, category, area, id } = recipe;
  const [showCopied, setShowCopied] = useState(false);
  const { setFavorites } = useContext(RecipesContext);

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

  const disfavor = () => {
    removeFromFavorites(id);
    setFavorites((prevState) => prevState.filter((element) => element.id !== id));
  };

  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        { renderTopText() }
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        <button type="button" onClick={ copyLink }>
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button type="button" onClick={ disfavor }>
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
