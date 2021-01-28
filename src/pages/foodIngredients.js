import React, { } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function FoodIngredients() {
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
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </header>
      <Footer />
    </div>
  );
}

export default FoodIngredients;
