import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import * as drinkApiFunctions from '../services/drinkApiFunctions';

function ExplorerDrinks() {
  const [randomDrinkId, setRandomDrinkId] = useState('');
  useEffect(() => {
    drinkApiFunctions
      .fetchRandomDrinkRecipes()
      .then((response) => setRandomDrinkId(response.drinks[0].idDrink));
  }, []);
  return (
    <div>
      <HeaderNoSearch title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrinkId}` }>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
