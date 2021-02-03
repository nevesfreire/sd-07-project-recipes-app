import React from 'react';
import { useHistory } from 'react-router-dom';
import getMeals from '../../services/mealAPI';

export default function FoodExplore() {
  const history = useHistory();
  async function randomRecipes() {
    const data = await getMeals('random', '');
    const { idMeal } = data.meals[0];
    const newMeal = (history.location.pathname)
      .replace('explorar/comidas', `comidas/${idMeal}`);
    history.push(newMeal);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ randomRecipes }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
