import React from 'react';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteCard({ recipe, index }) {
  const { name, image, type, alcoholicOrNot, category, area } = recipe;

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
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        <img
          src={ blackHeartIcon }
          alt="heart"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </div>
    </div>
  );
}
