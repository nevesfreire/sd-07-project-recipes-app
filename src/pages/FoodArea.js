import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import perfilIcon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

import RecipesContext from '../context/RecipesContext';

function FoodArea() {
  const { setSearchRender,
    searchRender } = useContext(RecipesContext);

  const stateSearchInput = (stateInput) => {
    setSearchRender(!stateInput);
  };

  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Explorar Origem
        </h1>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ perfilIcon }
              alt="perfil"
            />
          </button>
        </Link>
        <button type="button" onClick={ () => stateSearchInput(searchRender) }>
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="busca"
          />
        </button>

      </header>
      this is food area
      <Footer />
    </div>

  );
}

export default FoodArea;
