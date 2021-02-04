import React, { useState, useEffect } from 'react';
import { CardAll, Header } from '../../Components';

function FavoriteRecipes() {
  const [getRecipe, setRecipe] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));
  const [FoodOrDrink, setRenderAll] = useState(getRecipe);

  useEffect(() => {

  }, [getRecipe]);

  const handleDrink = () => {
    const drink = getRecipe.filter((selectFood) => selectFood.type === 'bebida');
    setRenderAll(drink);
  };
  const handleFood = () => {
    const food = getRecipe.filter((selectFood) => selectFood.type === 'comida');
    setRenderAll(food);
  };

  const handleFoodAndDrink = () => {
    setRenderAll(getRecipe);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={ handleFoodAndDrink }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleFood }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ handleDrink }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        <CardAll FoodOrDrink={ FoodOrDrink } />
      </div>
    </div>
  );
}

export default FavoriteRecipes;
