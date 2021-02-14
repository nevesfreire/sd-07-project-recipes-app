import React, { } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
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
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </header>

      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drink
        </button>

      </div>
    </div>
  );
}

export default DoneRecipes;
