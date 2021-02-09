import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function ExploreDrink() {
  const [surprise, setSurprise] = useState();
  async function surpriseAPI() {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json());
    return setSurprise(results.drinks[0]);
  }

  function lintEuTeAmo() {
    return (
      <Link to={ `/bebidas/${surprise.idDrink}` }>
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
      <Header title="Explorar Bebidas" explore={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            variant="dark"
            className="buttonCategories"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes

          </Button>
        </Link>
        {
          surprise
        && lintEuTeAmo()
        }
      </div>
      <FooterMenu />
    </div>);
}

export default ExploreDrink;
