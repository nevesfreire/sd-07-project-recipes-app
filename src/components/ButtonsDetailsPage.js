import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonsDetailsPage({ api }) {
  const history = useHistory();
  const [copyLink, setCopyLink] = useState(false);
  const [heartStatus, setHeartStatus] = useState('');

  const changeStatus = (getStatus) => {
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/').splice(position, numberToSplice).toString();
    const returnId = getStatus.find((recipe) => recipe.id === splitPath);
    if (returnId) {
      setHeartStatus('black');
    } else {
      setHeartStatus('white');
    }
  };

  useEffect(() => {
    const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getStatus) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setHeartStatus('white');
    } else {
      changeStatus(getStatus);
    }
  }, []);

  const handleShare = () => {
    let alternative = '';
    (api.key === 'meal') ? alternative = 'comidas' : alternative = 'bebidas';
    const path =`${window.location.origin}/${alternative}/${api.recipeId}`;
    copy(path)
      .then(() => setCopyLink(true));
  };

  const handleAction = () => {
    const { key } = api;
    let categoryEntry = '';
    let isAlcoholicEntry = '';
    const pathCheck = [window.location].includes('/in-progress');
    if (pathCheck) {
      categoryEntry = api.category;
      isAlcoholicEntry = api.alcoholic;
    } else {
      categoryEntry = api.area;
      isAlcoholicEntry = api.category;
    }

    const recipeCocktail = {
      id: api.recipeId,
      type: 'bebida',
      area: '',
      category: categoryEntry,
      alcoholicOrNot: isAlcoholicEntry,
      name: api.title,
      image: api.source,
    };

    const recipeMeal = {
      id: api.recipeId,
      type: 'comida',
      area: api.area,
      category: api.category,
      alcoholicOrNot: '',
      name: api.title,
      image: api.source,
    };

    const addNewRecipe = key === 'cocktail' ? recipeCocktail : recipeMeal;

    if (heartStatus === 'white') {
      setHeartStatus('black');
      const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const myRecipes = [...getStatus, addNewRecipe];
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(myRecipes));
    } else {
      setHeartStatus('white');
      const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const returned = getStatus.filter((recipe) => recipe.id !== api.recipeId);
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(returned));
    }
  };

  return (
    <div>
      <input
        data-type="share"
        data-testid="share-btn"
        type="image"
        alt="share-button"
        src={ shareIcon }
        onClick={ handleShare }
      />
      <input
        data-type="favorite"
        data-testid="favorite-btn"
        type="image"
        alt="favorite-button"
        src={ heartStatus === 'white' ? whiteHeartIcon : blackHeartIcon }
        onClick={ handleAction }
      />
      { copyLink === true ? (<span>Link copiado!</span>) : false }
    </div>
  );
}

ButtonsDetailsPage.propTypes = {
  api: PropTypes.shape({
    key: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export default ButtonsDetailsPage;
