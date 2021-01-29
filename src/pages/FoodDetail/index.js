import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getMeals from '../../services/mealAPI';
import getDrinks from '../../services/cockTailAPI';
import Ingredients from './Ingredients';
import RecomedendationList from './RecomendationList';
import { setStorage, getStorage } from '../../services/localStorage';
import './style.css';

function setFavourite(recipe) {
  const values = getStorage('favoriteRecipes');
  const value = [{
    id: recipe.idMeal,
    type: recipe.strTags,
    area: recipe.strArea,
    category: recipe.srtCategory,
    alcoholicOrNot,
    name,
    image }]
  setStorage('favoriteRecipes', { ...values, value });
}

export default function FoodDetail() {
  const [data, setData] = useState([]);
  const [recomedation, setRecomedation] = useState([]);
  const history = useHistory();
  const mealId = (history.location.pathname).replace('/comidas/', '');

  useEffect(() => {
    async function fetchMeal() {
      const response = await getMeals('lookupIngredient', mealId);
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
        data-testid="share-btn"
      >
        compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        favoritar
      </button>
      <p data-testid="recipe-category">{ data.strCategory }</p>
      <ul>
        <Ingredients data={ data } />
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <div data-testid="video">{ data.strYoutube }</div>
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
        onClick={ () => history.push(`/comidas/${mealId}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}
