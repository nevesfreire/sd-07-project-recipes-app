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
      <Header />
      <h1 data-testid="page-title">Explorar Comidas</h1>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={ randomRecipe }>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
};

export default FoodExplore;
