import React from 'react';
import { useHistory } from 'react-router-dom';

import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';

function Header() {
  const food = <h1 data-testid="page-title">Comidas</h1>;
  const drink = <h1 data-testid="page-title">Bebidas</h1>;
  const explorer = <h1 data-testid="page-title">Explorar</h1>;
  const explorerFoods = <h1 data-testid="page-title">Explorar Comidas</h1>;
  const explorerDrinks = <h1 data-testid="page-title">Explorar Bebidas</h1>;
  const explorerIngredients = <h1 data-testid="page-title">Explorar Ingredientes</h1>;
  const explorerIngredientsDrinks = (
    <h1 data-testid="page-title">Explorar Ingredientes</h1>
  );
  const explorerOrigin = <h1 data-testid="page-title">Explorar Origem</h1>;
  const profile = <h1 data-testid="page-title">Perfil</h1>;
  const recipesDone = <h1 data-testid="page-title">Receitas Feitas</h1>;
  const recipesFavorites = <h1 data-testid="page-title">Receitas Favoritas</h1>;

  const path = useHistory().location.pathname;
  const elementProfile = (
    <div className="profile">
      <img
        data-testid="profile-top-btn"
        src={ imageProfile }
        alt="Perfil"
      />
    </div>
  );

  const elementSearch = (
    <div className="search">
      <img
        data-testid="search-top-btn"
        src={ imageSearch }
        alt="Buscar"
      />
    </div>
  );

  function renderHeader() {
    console.log(path);
    switch (path) {
    case '/comidas':
      return (
        <div>
          {elementProfile}
          {food}
          {elementSearch}
        </div>
      );
    case '/bebidas':
      return (
        <div>
          {elementProfile}
          {drink}
          {elementSearch}
        </div>
      );
    case '/explorar':
      return (
        <div>
          {elementProfile}
          {explorer}
        </div>
      );
    case '/explorar/comidas':
      return (
        <div>
          {elementProfile}
          {explorerFoods}
        </div>
      );
    case '/explorar/bebidas':
      return (
        <div>
          {elementProfile}
          {explorerDrinks}
        </div>
      );
    case '/explorar/comidas/ingredientes':
      return (
        <div>
          {elementProfile}
          {explorerIngredients}
        </div>
      );
    case '/explorar/bebidas/ingredientes':
      return (
        <div>
          {elementProfile}
          {explorerIngredientsDrinks}
        </div>
      );
    case '/explorar/comidas/area':
      return (
        <div>
          {elementProfile}
          {explorerOrigin}
          {elementSearch}
        </div>
      );
    case '/perfil':
      return (
        <div>
          {elementProfile}
          {profile}
        </div>
      );
    case '/receitas-feitas':
      return (
        <div>
          {elementProfile}
          {recipesDone}
        </div>
      );
    case '/receitas-favoritas':
      return (
        <div>
          {elementProfile}
          {recipesFavorites}
        </div>
      );
    default:
      break;
    }
  }

  return (
    <div>{renderHeader()}</div>
  );
}

export default Header;
