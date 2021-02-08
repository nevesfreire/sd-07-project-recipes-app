import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import { getRandomDrink } from '../services/Api';

function ExploreDrinks() {
  const { push } = useHistory();
  const [fetchDrink, setFetchDrink] = useState();

  useEffect(() => {
    async function randomDrink() {
      const fetch = await getRandomDrink();
      setFetchDrink(fetch[0]);
    }
    randomDrink();
  }, []);
  console.log(fetchDrink);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Explorar Bebidas</h1>
      </header>
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => push(`/bebidas/${fetchDrink.idDrink}`) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
