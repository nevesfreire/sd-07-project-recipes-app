import React from 'react';
import { useHistory } from 'react-router-dom';
import getMeals from '../../services/mealAPI';
import Header from '../../components/Header';

export default function FoodExplore() {
  const history = useHistory();
  async function randomRecipes() {
    const data = await getMeals('random', '');
    const { idMeal } = data.meals[0];
    (history.location.pathname).replace('explorar/comidas', '');
    history.push(`/comidas/${idMeal}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
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
