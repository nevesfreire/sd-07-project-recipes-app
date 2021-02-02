import React, { useContext } from 'react';
import RecipeContext from '../Context/Context';
import CardMadeRecipes from '../components/CardMadeRecipes';

function RecipesMade() {
  const { detailsRecipe } = useContext(RecipeContext);

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <CardMadeRecipes />
    </div>
  );
}

export default RecipesMade;
