import React, { useContext } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import SearchInput from '../components/SearchInput';
import RecipesContext from '../context/RecipesContext';

function FoodRecipes() {
  const zero = 0;
  const Twelve = 12;
  const { searchRender, recipesFilters } = useContext(RecipesContext);
  const filterRecipesTwelve = recipesFilters !== null
    ? recipesFilters.slice(zero, Twelve)
    : [];

  return (
    <div>
      <Header />
      <Category />
      { searchRender ? <SearchInput /> : null}
      {filterRecipesTwelve.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <p data-testid={ `${index}-card-name` }>
            Nome:
            {recipe.strMeal}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            width="200px"
            alt="receitas"
            src={ recipe.strMealThumb }
          />
        </div>
      ))}
    </div>
  );
}

export default FoodRecipes;
