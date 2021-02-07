import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Context } from '../../context/Provider';
import { getItem, saveItem, initialize } from '../../services/localStorage';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const button = (renderButton, inProgress, api, id) => {
  let path = '';
  if (api === 'meal') path = 'comidas';
  else path = 'bebidas';

  const beginRecipe = (dataId) => {
    const inProgressObj = getItem('inProgressRecipes');
    const field = api === 'meal' ? 'meals' : 'cocktails';
    const isProgress = Object.keys(inProgressObj[field])
      .some((progressId) => progressId === dataId);
    if (!isProgress) {
      inProgressObj[field][dataId] = [];
    }
    saveItem('inProgressRecipes', inProgressObj);
  };

  return (
    <Link to={ `/${path}/${id}/in-progress` }>
      {renderButton && (
        <button
          type="button"
          className="detail__button"
          data-testid="start-recipe-btn"
          onClick={ () => beginRecipe(id) }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </Link>
  );
};

function formatFavorite(data, api) {
  let drinkOrMeal = '';
  if (api === 'meal') drinkOrMeal = 'comida';
  else drinkOrMeal = 'bebida';

  const favoriteRecipesArray = getItem('favoriteRecipes');

  const isRecipeFavorite = favoriteRecipesArray
    .some((recipe) => recipe.id === data.id);

  let alcoholic = '';

  if (data.alcoholic) {
    alcoholic = 'Alcoholic';
  }

  const objFavorite = {
    id: data.id,
    type: drinkOrMeal,
    area: data.area || '',
    category: data.category,
    alcoholicOrNot: alcoholic,
    name: data.name,
    image: data.src,
  };

  if (!isRecipeFavorite) {
    favoriteRecipesArray.push(objFavorite);
  } else {
    const index = favoriteRecipesArray.map((recipe) => recipe.id).indexOf(data.id);
    favoriteRecipesArray.splice(index, 1);
  }
  saveItem('favoriteRecipes', favoriteRecipesArray);
}

function Actions({ data }) {
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');
  const [isFavorite, setIsFavorite] = useState(false);
  const [renderButton, setRenderButton] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const { api } = useContext(Context);

  useEffect(() => {
    initialize();
    const doneRecipes = getItem('doneRecipes');
    const isDone = doneRecipes.some(({ id }) => id === data.id);
    if (isDone) setRenderButton(false);
    else setRenderButton(true);

    const inProgressObj = getItem('inProgressRecipes');
    const field = api === 'meals' ? 'meals' : 'cocktails';
    if (inProgressObj[field]) {
      const isProgress = Object.keys(inProgressObj[field]).some((id) => id === data.id);
      if (isProgress) setInProgress(true);
      else setInProgress(false);
    }

    const favoriteRecipesArray = getItem('favoriteRecipes');
    const isRecipeFavorite = favoriteRecipesArray
      .some((recipe) => recipe.id === data.id);
    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  }, [data.id, api]);

  const copyLink = () => {
    const twoSecondes = 2000;
    const getUrl = window.location.href;
    copy(getUrl);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };

  const setAsFavorite = () => {
    formatFavorite(data, api);
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="detail__actions">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      <button
        type="button"
        onClick={ setAsFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="heartIcon"
          style={ { maxWidth: 26 } }
        />
      </button>
      {button(renderButton, inProgress, api, data.id)}
      <p hidden={ showCopiedMessage }>Link copiado!</p>
    </div>
  );
}

Actions.propTypes = {
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

export default Actions;
