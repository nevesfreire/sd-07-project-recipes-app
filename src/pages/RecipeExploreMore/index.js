import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRandom } from '../../services/recipeAPI';

const ExploreMore = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [randomDrinkId, setRandomDrinkId] = useState('');
  const [randomMealId, setRandomMealId] = useState('');

  useEffect(() => {
    getRandom('bebidas')
      .then((response) => setRandomDrinkId(response[0].id));

    getRandom('comidas')
      .then((response) => setRandomMealId(response[0].id));
  }, []);

  if (currentPath.includes('bebidas')) {
    return (
      <div>
        <h2>Bebida</h2>
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
      </div>
    );
  } if (currentPath.includes('comidas')) {
    return (
      <div>
        <h2>Comida</h2>
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
        <Link to={ `/comidas/${randomMealId}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
};

export default ExploreMore;
