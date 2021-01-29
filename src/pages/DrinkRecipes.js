import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import RecipesContext from '../context/RecipesContext';
import { getCurrenceRecipesDrinksName } from '../services/drinkAPI';

function DrinksRecipes() {
  const zero = 0;
  const Twelve = 12;
  const { searchRender,
    recipesFilters,
    setDrinkRecipeId,
    drinkRecipeId,
    setRecipesFilters } = useContext(RecipesContext);
  const filterRecipesTwelve = recipesFilters !== null
    ? recipesFilters.slice(zero, Twelve)
    : [];

  useEffect(() => {
    getCurrenceRecipesDrinksName('')
      .then((response) => setRecipesFilters(response.drinks));
  }, [setRecipesFilters]);

  if (recipesFilters !== null && recipesFilters.length === 1) {
    const { idDrink } = recipesFilters[zero];
    setDrinkRecipeId(idDrink);
    return <Redirect to={ `bebidas/${idDrink}` } />;
  }

  if (drinkRecipeId !== '') {
    return <Redirect to={ `bebidas/${drinkRecipeId}` } />;
  }
  const showDetails = (id) => {
    setDrinkRecipeId(id);
  };

  return (
    <div>
      <Header />
      { searchRender ? <SearchInput /> : null}

      {filterRecipesTwelve.map((recipe, index) => (
        <button
          type="button"
          onClick={ () => showDetails(recipe.idDrink) }
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <p data-testid={ `${index}-card-name` }>
            Nome:
            {recipe.strDrink}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            width="200px"
            alt="receitas"
            src={ recipe.strDrinkThumb }
          />
        </button>
      ))}
    </div>
  );
}

export default DrinksRecipes;
