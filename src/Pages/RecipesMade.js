import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../Context/Context';
import CardMadeRecipes from '../components/CardMadeRecipes';

function RecipesMade() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  console.log(detailsRecipe);
  // pegar do local storage o array de obj
  function getItemsFromStorage() {
    return JSON.parse(localStorage.getItem('doneRecipes'));
  }

  function handleFilter(type) {
    const doneRecipesLocal = getItemsFromStorage();
    if (type === 'drink') {
      const filteredDoneRecipes = doneRecipesLocal
        .filter((recipe) => recipe.type === 'bebida');
      setDoneRecipes(filteredDoneRecipes);
    }
    if (type === 'food') {
      const filteredDoneRecipes = doneRecipesLocal
        .filter((recipe) => recipe.type === 'comida');
      setDoneRecipes(filteredDoneRecipes);
    }
    if (type === 'all') {
      setDoneRecipes(doneRecipesLocal);
    }
  }

  useEffect(() => {
    const doneRecipesLocal = getItemsFromStorage();
    setDoneRecipes(doneRecipesLocal);
  }, []);
  console.log('receitas feitas', doneRecipes);
  return (
    <div>
      <div className="recipesMadeButtons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { handleFilter('all'); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => { handleFilter('food'); } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { handleFilter('drink'); } }
        >
          Drinks
        </button>
      </div>
      {doneRecipes.map((doneRecipe, index) => (
        <CardMadeRecipes key={ doneRecipe.id } recipe={ doneRecipe } index={ index } />
      ))}

    </div>
  );
}

export default RecipesMade;
