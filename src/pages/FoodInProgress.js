import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import {
  fetchAPI,
} from '../services/helpers';
import '../style/recipeDetail.css';
import CheckBoxProgress from './CheckBoxProgress';

function FoodInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const mealRecipeId = pathname.split('/')[2];

  const { recipeDetailFood, setMealRecipeId, setRecipeDetailFood } = useContext(
    RecipesContext,
  );

  useEffect(() => {
    const getAPI = async () => {
      const food = await fetchAPI(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`,
      );
      const recipeFood = await food.meals;
      setRecipeDetailFood(recipeFood[0]);
      setMealRecipeId(mealRecipeId);
    };
    getAPI();
  }, [setMealRecipeId, mealRecipeId, setRecipeDetailFood]);

  const handleCopyClick = () => {
    copy(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`,
    );
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetailFood.strMealThumb }
        alt="food"
      />
      <h2 data-testid="recipe-title">{recipeDetailFood.strMeal}</h2>
      <button type="button" data-testid="share-btn" onClick={ handleCopyClick }>
        Share
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>
      <p data-testid="recipe-category">{recipeDetailFood.strCategory}</p>
      <CheckBoxProgress />
      <p data-testid="instructions">{recipeDetailFood.strInstructions}</p>
      <video data-testid="video" width="750" height="500" controls>
        <source src={ recipeDetailFood.strYoutube } type="video/mp4" />
        <track src={ recipeDetailFood.strYoutube } kind="captions" />
      </video>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default FoodInProgress;
