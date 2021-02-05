import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function ExploreFood() {
  const [surprise, setSurprise] = useState();
  async function surpriseAPI() {
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return setSurprise(results.meals[0]);
  }

  function lintEuTeAmo() {
    return (
      <Link to={ `/comidas/${surprise.idMeal}` }>
        <button
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!

        </button>
      </Link>
    );
  }

  useEffect(() => {
    surpriseAPI();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" explore={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes

          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button data-testid="explore-by-area" type="button">Por Local de Origem</button>
        </Link>
        {
          surprise
        && lintEuTeAmo()
        }
      </div>
      <FooterMenu />
    </div>
  );
}
export default ExploreFood;
