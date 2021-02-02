import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import getMeals from '../../services/mealAPI';
import getDrinks from '../../services/cockTailAPI';
import Ingredients from './Ingredients';
import { setStorage, getStorage } from '../../services/localStorage';
import './style.css';
import { blackHeartIcon, whiteHeartIcon, shareIcon } from '../../images';

function addFavorite(recipe) {
  let values = getStorage('favoriteRecipes');
  if (values === null) values = [];
  const value = [{
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  }];
  const newValue = values.concat(value);
  setStorage('favoriteRecipes', newValue);
}

function removeFavorite(mealId) {
  const values = getStorage('favoriteRecipes');
  if (values === null) return null;
  const newValue = values.filter((item) => item.id !== mealId);
  setStorage('favoriteRecipes', newValue);
}

function isFavorite(mealId) {
  const values = getStorage('favoriteRecipes');
  if (values === null) return false;
  return values.find((item) => item.id === mealId);
}

export default function FoodProgress() {
  const history = useHistory();
  const { id } = useParams();
  const mealId = id;
  const [data, setData] = useState([]);
  const [recomedation, setRecomedation] = useState([]);
  const [favorite, setFavorite] = useState(isFavorite(mealId));
  const [isShared, setIsShared] = useState('');

  useEffect(() => {
    async function fetchMeal() {
      const response = await getMeals('ID', mealId);
      setData(response.meals[0]);
    }
    fetchMeal();
  }, [setData, mealId]);

  useEffect(() => {
    async function fetchRecomedention() {
      const response = await getDrinks('searchName', '');
      setRecomedation(response.drinks);
    }
    fetchRecomedention();
  }, [setRecomedation, mealId]);

  function toggleFavorite() {
    if (!favorite) {
      addFavorite(data);
      setFavorite(true);
    } else {
      removeFavorite(mealId);
      setFavorite(false);
    }
  }

  // function copyToClipboard() {
  //   shareLink.select();
  //   document.execCommand('copy');
  //   alert('Copied the text: ', shareLink);
  // }
  function copyToClipboard() {
    const shareLink = `http://localhost:3000${history.location.pathname}`;
    // await navigator.clipboard.writeText(shareLink);
    copy(shareLink);
    // setIsShared(false);
    setIsShared('Link copiado!');
  }

  if (data.length < 1) return null;
  if (recomedation.length < 1) return null;

  return (
    <div>
      <img
        alt="imagem da receita"
        data-testid="recipe-photo"
        src={ data.strMealThumb }
      />
      <div data-testid="recipe-title">{ data.strMeal }</div>
      <button
        type="button"
        onClick={ () => copyToClipboard() }
      >
        <img
          data-testid="share-btn"
          alt="icone compartilhar"
          src={ shareIcon }
        />
        {/* <p hidden={ isShared }>Link copiado!</p> */}
        <span>{ isShared }</span>
      </button>
      <button
        type="button"
        onClick={ () => toggleFavorite() }
      >
        <img
          data-testid="favorite-btn"
          alt="icone favorito"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
      <p data-testid="recipe-category">{ data.strCategory }</p>
      <Ingredients data={ data } />
      <p data-testid="instructions">{ data.strInstructions }</p>

      <button
        disabled
        type="button"
        data-testid="start-recipe-btn"
        className="button-start-recipe"
        id="finish-recipe"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
