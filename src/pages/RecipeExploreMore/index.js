import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ExploreMore() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath.includes('bebidas')) {
    return (
      <div>
        <h2>Drinks</h2>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </div>
    );
  } if (currentPath.includes('comidas')) {
    return (
      <div>
        <h2>Food</h2>
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

        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

export default ExploreMore;
