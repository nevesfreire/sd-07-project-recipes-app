import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import SearchIconButton from './SearchComponents/SearchIconButton';

function Header() {
  const {
    title,
    setTitle,
  } = useContext(RecipesContext);

  const history = useHistory();

  const handleProfile = () => {
    history.push('/perfil');
  };

  const handleTitle = () => {
    switch (history.location.pathname) {
    case '/comidas':
      return 'Comidas';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/perfil':
      return 'Perfil';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    default:
      return '';
    }
  };

  useEffect(() => {
    setTitle(handleTitle());
  }, []);

  if (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem') {
    return (
      <header>
        <button
          type="button"
          onClick={ handleProfile }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>
        <h2 data-testid="page-title">{ title }</h2>
        <SearchIconButton />
      </header>
    );
  }

  return (
    <header>
      <button
        type="button"
        onClick={ handleProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
        />
      </button>
      <h2 data-testid="page-title">{ title }</h2>
    </header>
  );
}

export default Header;
