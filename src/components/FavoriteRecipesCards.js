import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHearthIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import './donerecipes.css';

function FavoriteRecipesCards({
  thumb,
  title,
  index,
  id,
  type,
  category,
  area,
  alcoholicOrNot,
  removeFavorite,
}) {
  const [copyMessage, setCopyMessage] = useState('');
  const [isFavorite] = useState(true);
  const url = (text) => {
    let returnText = '';
    switch (text) {
    case 'bebida':
      returnText = 'bebidas';
      break;
    case 'comida':
      returnText = 'comidas';
      break;
    default:
      returnText = text;
      break;
    }
    return returnText;
  };

  const copyClipboard = () => {
    const urlarray = window.location.href.split('/');
    const urlToCopy = `${urlarray[0]}//${urlarray[2]}/${type}s/${id}`;
    clipboardCopy(urlToCopy);
    setCopyMessage('Link copiado!');
  };

  return (
    <div className="favoriteCard">
      <div className="img_recipes">
        <img
          src={ thumb }
          alt="Imagem do profile"
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <div id="infos-recipe">
        <div>
          Category:
          {' '}
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${area}${alcoholicOrNot} - ${category}`}
          </p>
        </div>
        <Link to={ `/${url(type)}/${id}` }>
          <div className="div" data-testid="page-div">
            <p data-testid={ `${index}-horizontal-name` }>{title}</p>
          </div>
        </Link>
        <div className="interation-buttons">
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="compartilhar"
            onClick={ copyClipboard }
          />
          {copyMessage}
          <input
            type="image"
            onClick={ () => removeFavorite(id) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ isFavorite ? blackHearthIcon : whiteHearthIcon }
            alt="Icone Favoritar"
          />
        </div>
      </div>
    </div>
  );
}

FavoriteRecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipesCards;
