import React, { useState, useEffect } from 'react';
import { CardAll, Header } from '../../Components';

function DoneRecipes() {
  const filtrar = JSON.parse(localStorage.getItem('doneRecipes'));
  const [getRecipe, setRecipe] = useState(filtrar);
  const [FoodOrDrink, setRenderAll] = useState(getRecipe);

  useEffect(() => { setRecipe(FoodOrDrink); }, [getRecipe, FoodOrDrink]);

  const handleDrink = () => {
    const drink = filtrar.filter(
      (selectFood) => selectFood.type === 'bebida',
    );
    setRenderAll(drink);
  };
  const handleFood = () => {
    const food = filtrar.filter((selectFood) => selectFood.type === 'comida');
    setRenderAll(food);
  };

  const handleFoodAndDrink = () => {
    setRenderAll(filtrar);
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
        <CardAll setRenderAll={ setRenderAll } FoodOrDrink={ FoodOrDrink } />
      </div>
    </div>
  );
}

export default DoneRecipes;
