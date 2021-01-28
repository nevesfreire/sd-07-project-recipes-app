import React, { } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
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
        <Link to="/AQUI VAI A API">
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
