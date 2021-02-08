import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RequestRandomFood from '../../services/randomFood';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const FoodExplore = () => {
  const [randomId, setRandomId] = useState(false);

  const randomRecipe = useCallback(async () => {
    setRandomId(await RequestRandomFood());
  }, []);

  if (randomId) return <Redirect to={ `/comidas/${randomId}` } />;
  return (
    <div>
      <Header>Explorar Comidas</Header>
      <div className="explore-buttons">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="first-food-explore"
        >
          <Link to="/explorar/comidas/ingredientes" style={ { color: 'inherit' } }>
            Por Ingredientes
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          className="second-food-explore"
        >
          <Link to="/explorar/comidas/area" style={ { color: 'inherit' } }>
            Por Local de Origem
          </Link>
        </button>
        <button
          type="button"
          onClick={ randomRecipe }
          className="third-food-explore"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default FoodExplore;
