import React from 'react';
import { useHistory } from 'react-router-dom';
import getDrinks from '../../services/cockTailAPI';

export default function DrinkExplore() {
  const history = useHistory();
  async function randomRecipes() {
    const data = await getDrinks('random', '');
    const { idDrink } = data.drinks[0];
    const newDrink = (history.location.pathname)
      .replace('explorar/bebidas', `bebidas/${idDrink}`);
    history.push(newDrink);
  }
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
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
