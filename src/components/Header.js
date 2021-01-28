import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const {
    url,
    handleUrlChange,
  } = useContext(RecipesContext);

  const titleByUrl = () => {
    switch (url) {
    case 'http://localhost:3000/comidas':
      return 'Comidas';
    case 'http://localhost:3000/bebidas':
      return 'Bebidas';
    case 'http://localhost:3000/explorar':
      return 'Explorar';
    case 'http://localhost:3000/explorar/comidas':
      return 'Explorar Comidas';
    case 'http://localhost:3000/explorar/bebidas':
      return 'Explorar Bebidas';
    case 'http://localhost:3000/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case 'http://localhost:3000/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case 'http://localhost:3000/explorar/comidas/area':
      return 'Explorar Origem';
    case 'http://localhost:3000/perfil':
      return 'Perfil';
    case 'http://localhost:3000/receitas-feitas':
      return 'Receitas Feitas';
    case 'http://localhost:3000/receitas-favoritas':
      return 'Receitas Favoritas';
    default:
      return '';
    }
  };

  return (
    <header>
      <Link to="/perfil">
        <button
          type="button"
          onClick={ handleUrlChange() }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>
      </Link>
      <h2 data-testid="page-title">{ titleByUrl() }</h2>
    </header>
  );
}

export default Header;
