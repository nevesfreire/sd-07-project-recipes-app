import React, { useState, useEffect, useCallback } from 'react';
import '../components/components.css';
import PropTypes from 'prop-types';
import {
  Button, LoadingCard, ShareButton, FavoriteDrinkButton, CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi, useLocalStorage } from '../hooks';
import { getKeys } from '../Services';

const initialState = (id) => (
  { cocktails: { [id]: [] } }
);

const removeItem = (itemRm, arr) => (
  arr.filter((item) => itemRm !== item)
);

export default function RecipeDrinkInProgress({ history: { push }, match }) {
  const { params: { idDrink } } = match;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const [loading, { drinks }] = useFetchApi(URL);

  const [inProgressRecipes, setRecipeStorage] = useLocalStorage('inProgressRecipes');
  const initialRecipeInProgress = inProgressRecipes
    && inProgressRecipes.cocktails[idDrink]
    ? inProgressRecipes
    : initialState(idDrink);
  const [recipeInProgress, setRecipe] = useState(initialRecipeInProgress);

  const setStorage = useCallback((date) => setRecipeStorage(date), [setRecipeStorage]);
  useEffect(() => {
    setStorage(recipeInProgress);
  }, [recipeInProgress, setStorage]);

  if (!loading && !drinks) return (<NotFound />);

  const itens = recipeInProgress.cocktails[idDrink];
  const legthIngredients = drinks && getKeys(drinks[0], 'strIngredient').length;
  const checkItem = (value) => {
    const exist = itens.includes(value);
    return exist
      ? setRecipe({
        ...recipeInProgress,
        cocktails: { [idDrink]: removeItem(value, itens) },
      })
      : setRecipe({
        ...recipeInProgress,
        cocktails: { [idDrink]: [...itens, value] },
      });
  };
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img data-testid="recipe-photo" src={ drinks[0].strDrinkThumb } alt="foto" />
          <div>
            <div>
              <h3 data-testid="recipe-title">{drinks[0].strDrink}</h3>
              <ShareButton />
              <FavoriteDrinkButton drinksArr={ drinks[0] } />
            </div>
            <h5 data-testid="recipe-category">{drinks[0].strAlcoholic}</h5>
            <CheckListIngredients
              ingreObj={ drinks[0] }
              checkItem={ checkItem }
              itens={ itens }
            />
            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {drinks[0].strInstructions}
              </p>
            </div>
            { legthIngredients === itens.length && !!itens.length
              ? (
                <Button
                  testid="finish-recipe-btn"
                  text="Finalizar receita"
                  func={ () => {
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

RecipeDrinkInProgress.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ idDrink: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
