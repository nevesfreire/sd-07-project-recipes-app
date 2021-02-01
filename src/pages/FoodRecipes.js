import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import RecipesContext from '../context/RecipesContext';
import { getCurrenceRecipesFoodsName } from '../services/foodAPI';

function FoodRecipes() {
  const zero = 0;
  const Twelve = 12;
  const { searchRender,
    recipesFilters,
    setMealRecipeId,
    mealRecipeId,
    setRecipesFilters,
  } = useContext(RecipesContext);
  const filterRecipesTwelve = recipesFilters !== null
    ? recipesFilters.slice(zero, Twelve)
    : [];

  useEffect(() => {
    getCurrenceRecipesFoodsName('')
      .then((response) => setRecipesFilters(response.meals));
  }, [setRecipesFilters]);

  if (recipesFilters !== null && recipesFilters.length === 1) {
    const { idMeal } = recipesFilters[zero];
    setMealRecipeId(idMeal);
    return <Redirect to={ `/comidas/${idMeal}` } />;
  }

  if (mealRecipeId !== '') {
    return <Redirect to={ `/comidas/${mealRecipeId}` } />;
  }

  const showDetails = (id) => {
    setMealRecipeId(id);
  };

  const handleClick = (id) => {
    setMealRecipeId(id);
  };

  return (

    <div>
      <Header />
      { searchRender ? <SearchInput /> : null}
      {filterRecipesTwelve.map((recipe, index) => (
        <button
          type="button"
          onClick={ () => showDetails(recipe.idMeal) }
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <p data-testid={ `${index}-card-name` }>
            Nome:
            {recipe.strMeal}
          </p>
          <Link
            to={ `/comidas/${recipe.idMeal}` }
            onClick={ () => handleClick(recipe.idMeal) }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="200px"
              alt="receitas"
              src={ recipe.strMealThumb }
            />
          </Link>
        </button>
      ))}
    </div>
  );
}

export default FoodRecipes;
