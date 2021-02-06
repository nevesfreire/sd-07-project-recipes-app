import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import FoodAppContext from '../context/FoodAppContext';
// import shareIcon from '../images/shareIcon.svg';
import shareIcon from '../images/fullShare.png';
// import favoriteIcon from '../images/blackHeartIcon.svg';
import favoriteIcon from '../images/fullHeart.png';
// import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import notFavoriteIcon from '../images/emptyHeart.png';
import useFavorites from '../hooks/useFavorites';

function TitleDetails({ recipes, pathname, id }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [favorite, handleClickFavorite, isAlreadyFavorite] = useFavorites();
  const [copy, setCopy] = useState(false);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  useEffect(() => {
    isAlreadyFavorite(id);
  }, []);

  const copyLink = () => {
    const delay = 2000;
    setCopy(true);
    setTimeout(() => setCopy(false), delay);
  };

  if (recipes === 'comidas') {
    return (
      <div className="div-title">
        {meals && meals.map(({ idMeal, strMeal, strCategory }) => (
          <div
            key={ idMeal }
            className="div-title-detail"
          >
            <h2
              data-testid="recipe-title"
            >
              {strMeal}
            </h2>
            <p
              data-testid="recipe-category"
            >
              {strCategory}
            </p>
          </div>
        ))}
        <p className="p-copy">{copy && ' Link copiado! '}</p>
        <div className="div-favorite-detail">
          <CopyToClipboard text={ pathname }>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => copyLink() }
            >
              <img
                className="img-compartilhar"
                src={ shareIcon }
                alt="Icone Compartilhar"
              />
            </button>
          </CopyToClipboard>
          <button
            type="button"
            onClick={ () => handleClickFavorite(meals, recipes, id) }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? favoriteIcon : notFavoriteIcon }
              alt="Icone Favoritar"
            />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="div-title">
      {drinks && drinks.map(({ idDrink, strDrink, strAlcoholic }) => (
        <div
          key={ idDrink }
          className="div-title-detail"
        >
          <h2
            data-testid="recipe-title"
          >
            {strDrink}
          </h2>
          <p
            data-testid="recipe-category"
          >
            {strAlcoholic}
          </p>
        </div>
      ))}
      <p className="p-copy">{copy && 'Link copiado!'}</p>
      <div className="div-favorite-detail">
        <CopyToClipboard text={ pathname }>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyLink() }
          >
            <img
              className="img-compartilhar"
              src={ shareIcon }
              alt="Icone Compartilhar"
            />
          </button>
        </CopyToClipboard>
        <button
          type="button"
          onClick={ () => handleClickFavorite(drinks, recipes, id) }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? favoriteIcon : notFavoriteIcon }
            alt="Icone Favoritar"
          />
        </button>
      </div>
    </div>
  );
}

TitleDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default TitleDetails;
