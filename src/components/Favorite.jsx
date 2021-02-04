import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import useFavorites from '../hooks/useFavorites';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function Favorite({ recipesStorage, setRecipesStorage }) {
  const [copy, setCopy] = useState(false);
  const [favorite] = useFavorites();

  const copyLink = () => {
    const delay = 2000;
    setCopy(true);
    setTimeout(() => setCopy(false), delay);
  };

  const handlerFilterRecipes = (number) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      recipesStorage && recipesStorage.filter(
        ({ id }) => id !== number,
      ),
    ));
    setRecipesStorage(
      recipesStorage && recipesStorage.filter(({ id }) => id !== number),
    );
  };

  return (
    <div className="div-favorite">
      <p>{copy && 'Link copiado!'}</p>
      {recipesStorage && recipesStorage.map(
        ({ id, type, area, category, image, alcoholicOrNot, name }, index) => (
          <div
            key={ id }
            className="div-favorite-div"
          >
            <div className="div-recipes-favorite">
              <Link to={ `${type}s/${id}` }>
                <img
                  className="img-favorite"
                  src={ image }
                  data-testid={ `${index}-horizontal-image` }
                  alt="Imagem Receita"
                />
              </Link>
              <div className="div-span-p">
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area === '' ? '' : area} - ${alcoholicOrNot === ''
                    ? category : alcoholicOrNot}`}
                </span>
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  <Link to={ `${type}s/${id}` }>{ name }</Link>
                </h5>
              </div>
            </div>
            <div className="div-buttons-share-favorite">
              <CopyToClipboard text={ `http://localhost:3000/${type}s/${id}` }>
                <button
                  type="button"
                  onClick={ () => copyLink() }
                >
                  <img
                    className="img-compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Icone Compartilhar"
                  />
                </button>
              </CopyToClipboard>
              <button
                type="button"
                value={ id }
                onClick={ () => handlerFilterRecipes(id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ !favorite ? favoriteIcon : notFavoriteIcon }
                  alt="Icone Favoritar"
                />
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

Favorite.propTypes = {
  recipesStorage: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setRecipesStorage: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default Favorite;
