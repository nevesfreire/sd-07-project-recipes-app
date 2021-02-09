import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
        <Button
          className="buttonCategories"
          variant="dark"
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!

        </Button>
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
          <Button
            variant="dark"
            data-testid="explore-by-ingredient"
            type="button"
            className="buttonCategories"
          >
            Por Ingredientes

          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            variant="dark"
            data-testid="explore-by-area"
            type="button"
            className="buttonCategories"
          >
            Por Local de Origem
          </Button>
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
