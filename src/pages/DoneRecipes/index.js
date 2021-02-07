import React, { useState, useEffect } from 'react';
import { CardAll, Header } from '../../Components';

function DoneRecipes() {
  const filtrar = JSON.parse(localStorage.getItem('doneRecipes'));
  const [FoodOrDrink, setRenderAll] = useState([]);

  useEffect(() => {
    if (filtrar) {
      setRenderAll(filtrar);
    }
  }, []);

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
      <Header>Receitas Feitas</Header>
      <div className="infos-button">
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
      </div>
      <div>
        <CardAll setRenderAll={ setRenderAll } FoodOrDrink={ FoodOrDrink } />
      </div>
    </div>
  );
}

export default DoneRecipes;
