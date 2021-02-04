import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import {
  fetchAPI,
} from '../services/helpers';
import '../style/recipeDetail.css';
import CheckBoxProgress from './CheckBoxProgress';

function DrinkInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const drinkRecipeId = pathname.split('/')[2];

  const {
    recipeDetailDrink,
    setDrinkRecipeId,
    setRecipeDetailDrink,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const drink = await fetchAPI(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`,
      );
      const recipeDrink = await drink.drinks;
      setRecipeDetailDrink(recipeDrink[0]);
      setDrinkRecipeId(drinkRecipeId);
    };
    getAPI();
  }, [drinkRecipeId, setDrinkRecipeId, setRecipeDetailDrink]);

  const handleCopyClick = () => {
    copy(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`,
    );
  };

  return (
    <div>
      <h1>Receitas em progresso</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetailDrink.strDrinkThumb }
          alt="drink"
        />
        <h2 data-testid="recipe-title">{recipeDetailDrink.strDrink}</h2>
        <button type="button" data-testid="share-btn" onClick={ handleCopyClick }>
          Share
        </button>
        <button type="button" data-testid="favorite-btn">
          Favorite
        </button>
        <p data-testid="recipe-category">{recipeDetailDrink.strAlcoholic}</p>
        <CheckBoxProgress />
        <p data-testid="instructions">{recipeDetailDrink.strInstructions}</p>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>
    </div>
  );
}

export default DrinkInProgress;
