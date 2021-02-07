import React, { useState, useEffect, useCallback } from 'react';
import '../components/components.css';
import PropTypes from 'prop-types';
import {
  Button, LoadingCard, ShareButton, FavoriteDrinkButton, CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi, useLocalStorage } from '../hooks';
import { getKeys } from '../Services';

const initialState = (id) => (
  { meals: { [id]: [] } }
);

const removeItem = (itemRm, arr) => (
  arr.filter((item) => itemRm !== item)
);

export default function RecipeFoodInProgress({ history: { push }, match }) {
  const { params: { idFood } } = match;
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
  const [loading, { meals }] = useFetchApi(URL);
  console.log(meals);

  const [inProgressRecipes, setRecipeStorage] = useLocalStorage('inProgressRecipes');
  const initialRecipeInProgress = (inProgressRecipes && meals)
    && inProgressRecipes.meals[idFood]
    ? inProgressRecipes
    : initialState(idFood);
  const [recipeInProgress, setRecipe] = useState(initialRecipeInProgress);

  const setStorage = useCallback((date) => setRecipeStorage(date), [setRecipeStorage]);
  useEffect(() => {
    setStorage(recipeInProgress);
  }, [recipeInProgress, setStorage]);

  if (!loading && !meals) return (<NotFound />);

  const itens = recipeInProgress.meals[idFood];
  const legthIngredients = meals && getKeys(meals[0], 'strIngredient').length;
  const checkItem = (value) => {
    const exist = itens.includes(value);
    return exist
      ? setRecipe({
        ...recipeInProgress,
        meals: { [idFood]: removeItem(value, itens) },
      })
      : setRecipe({
        ...recipeInProgress,
        meals: { [idFood]: [...itens, value] },
      });
  };

  const clearItem = () => {
    setRecipeStorage({
      ...recipeInProgress,
      meals: { [idFood]: [''] },
    });
  };
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img data-testid="recipe-photo" src={ meals[0].strMealThumb } alt="foto" />
          <div>
            <div>
              <h3 data-testid="recipe-title">{meals[0].strMeal}</h3>
              <ShareButton />
              <FavoriteDrinkButton mealsArr={ meals[0] } />
            </div>
            <h5 data-testid="recipe-category">{meals[0].strCategory}</h5>
            <CheckListIngredients
              ingreObj={ meals[0] }
              checkItem={ checkItem }
              itens={ itens }
            />
            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {meals[0].strInstructions}
              </p>
            </div>
            { legthIngredients === itens.length && !!itens.length
              ? (
                <Button
                  testid="finish-recipe-btn"
                  text="Finalizar receita"
                  func={ () => {
                    clearItem();
                    push('/receitas-feitas');
                  } }
                />
              )
              : (
                <button type="button" testid="finish-recipe-btn" disabled>
                  Finalizar receita
                </button>
              )}
          </div>
        </div>
      )

  );
}

RecipeFoodInProgress.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ idFood: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
