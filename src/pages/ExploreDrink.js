import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI } from '../services/helpers';

function ExploreDrink() {
  const { drinkRecipeId, setDrinkRecipeId } = useContext(RecipesContext);
  useEffect(() => {
    const getAPI = async () => {
      const randomDrink = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const drink = await randomDrink.drinks;
      setDrinkRecipeId(drink[0].idDrink);
    };
    getAPI();
  }, [setDrinkRecipeId]);

  return (
    <div>
      <h2>Explorar Bebidas por:</h2>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${drinkRecipeId}` }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
    </div>
  );
}

export default ExploreDrink;
