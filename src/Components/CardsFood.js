import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';

function CardsFood() {
  const { foods, fetchFoods } = useContext(RecipesContext);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      { foods.map(({ strMeal, strMealThumb }) => (
        <div key={ strMeal }>
          <img src={ strMealThumb } width="200" alt="Meal" />
          <p>{ strMeal }</p>
        </div>
      )) }
    </div>
  );
}

export default CardsFood;
