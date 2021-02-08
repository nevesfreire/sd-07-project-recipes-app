import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RequestRandomDrink from '../../services/randomDrink';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const DrinkExplore = () => {
  const [randomId, setRandomId] = useState(false);

  const randomRecipe = useCallback(async () => {
    setRandomId(await RequestRandomDrink());
  }, []);

  if (randomId) return <Redirect to={ `/bebidas/${randomId}` } />;
  return (
    <div>
      <Header>Explorar bebida</Header>
      <div className="explore-buttons">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="first-food-explore"
        >
          <Link to="/explorar/bebidas/ingredientes" style={ { color: 'inherit' } }>
            Por Ingredientes
          </Link>
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
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

export default DrinkExplore;
