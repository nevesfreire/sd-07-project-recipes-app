import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import * as foodApiFunctions from '../services/foodApiFunctions';

function ExplorerFood() {
  const [randomFoodId, setRandomFoodId] = useState('');
  useEffect(() => {
    foodApiFunctions
      .fetchRandomFoodRecipes()
      .then((response) => setRandomFoodId(response.meals[0].idMeal));
  }, []);
  return (
    <div>
      <HeaderNoSearch title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomFoodId}` }>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorerFood;
