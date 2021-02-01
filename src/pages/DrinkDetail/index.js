import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import getMeals from '../../services/mealAPI';
import getDrinks from '../../services/cockTailAPI';
import Ingredients from './Ingredients';
import RecomedendationList from './RecomendationList';
import { setStorage, getStorage } from '../../services/localStorage';
import { blackHeartIcon, whiteHeartIcon, shareIcon } from '../../images';

function addFavorite(recipe) {
  let values = getStorage('favoriteRecipes');
  if (values === null) values = [];
  const value = [{
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  }];
  const newValue = values.concat(value);
  setStorage('favoriteRecipes', newValue);
}

function removeFavorite(drinkId) {
  const values = getStorage('favoriteRecipes');
  if (values === null) return null;
  const newValue = values.filter((item) => item.id !== drinkId);
  setStorage('favoriteRecipes', newValue);
}

function isFavorite(drinkId) {
  const values = getStorage('favoriteRecipes');
  if (values === null) return false;
  return values.find((item) => item.id === drinkId);
}

export default function FoodDetail() {
  const history = useHistory();
  const drinkId = (history.location.pathname).replace('/bebidas/', '');
  const [data, setData] = useState([]);
  const [recomedation, setRecomedation] = useState([]);
  const [favorite, setFavorite] = useState(isFavorite(drinkId));
  const [isShared, setIsShared] = useState('');

  useEffect(() => {
    async function fetchMeal() {
      const response = await getDrinks('lookupIngredient', drinkId);
      setData(response.drinks[0]);
    }
    fetchMeal();
  }, [setData, drinkId]);

  useEffect(() => {
    async function fetchRecomedention() {
      const response = await getMeals('searchName', '');
      setRecomedation(response.meals);
    }
    fetchRecomedention();
  }, [setRecomedation, drinkId]);

  function toggleFavorite() {
    if (!favorite) {
      addFavorite(data);
      setFavorite(true);
    } else {
      removeFavorite(drinkId);
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
        src={ data.strDrinkThumb }
      />
      <div data-testid="recipe-title">{ data.strDrink }</div>
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
      <p data-testid="recipe-category">{ data.strAlcoholic }</p>
      <ul>
        <Ingredients data={ data } />
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <RecomedendationList data={ recomedation } />

      {/* <div>
        <div
          data-testid={ `${index}-recomendation-card` }
        >
          Recomendacao1
        </div>
        <div
          data-testid={ `${index}-recomendation-card` }
        >
          Recomendacao2
        </div>
      </div> */}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="button-start-recipe"
        onClick={ () => history.push(`/bebidas/${drinkId}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}
