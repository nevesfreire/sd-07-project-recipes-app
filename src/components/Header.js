import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import perfilIcon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import history from '../history/history';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/functions';

function Header() {
  const { setSearchRender,
    searchRender,
    setFilterSearch,
    filterSearch,
    searchInput,
    setRecipesFilters,

  } = useContext(RecipesContext);

  const perfilRedirect = () => {
    history.push('/perfil');
  };
  const stateSearchInput = (stateInput) => {
    setSearchRender(!stateInput);
  };

  const handlerChange = ({ target }) => {
    setFilterSearch(target.value);
  };

  const searchButton = (filter, inputSearch, setFilter) => {
    requestApi(filter, inputSearch, setFilter);
  };

  const checkLocation = history.location.pathname;

  return (
    <header>
      <h1 data-testid="page-title">
        Receitas de
        {' '}
        {' '}
        {checkLocation === '/bebidas' ? 'Bebidas' : 'Comidas'}
      </h1>
      <Link to="/perfil">
        <button type="button" onClick={ perfilRedirect }>
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

      <label htmlFor="ingredient">
        <input
          onClick={ handlerChange }
          value="ingredients-input"
          data-testid="ingredient-search-radio"
          name="search"
          type="radio"
          id="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          onClick={ handlerChange }
          value="name-input"
          data-testid="name-search-radio"
          name="search"
          type="radio"
          id="name"
        />
        Nome
      </label>
      <label htmlFor="first">
        <input
          onClick={ handlerChange }
          value="first-letter-input"
          data-testid="first-letter-search-radio"
          name="search"
          type="radio"
          id="first"
        />
        Primeira Letra
      </label>
      <button
        onClick={ () => searchButton(filterSearch,
          searchInput,
          setRecipesFilters) }
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </header>
  );
}

export default Header;
