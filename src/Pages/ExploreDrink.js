import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    surpriseAPI();
  }, []);
  return (
    <div>
      <Header title="Explorar Bebidas" explore={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes

          </button>
        </Link>
        {
          surprise
        && <Link to={ `/bebidas/${surprise.idDrink}` }>
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!

          </button>
        </Link>
        }
      </div>
      <FooterMenu />
    </div>);
}

export default ExploreDrink;
