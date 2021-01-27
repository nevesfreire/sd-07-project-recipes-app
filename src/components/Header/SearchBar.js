import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';

export default function SearchBar() {
  const [filterType, setFilterType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { fetchMeals, fetchDrinks } = useContext(RecipesContext);

  const searchMeals = async () => {
    const meal = await fetchMeals(filterType, searchInput);
    if (!meal) return null;
    const id = meal.result.meals[0].idMeal;
    if (meal.redirect) return window.location.replace(`/comidas/${id}`);
  };

  const searchDrinks = async () => {
    const drink = await fetchDrinks(filterType, searchInput);
    if (!drink) return null;
    const id = drink.result.drinks[0].idDrink;
    if (drink.redirect) return window.location.replace(`/bebidas/${id}`);
  };

  const { pathname } = useLocation();

  const handleSearch = () => {
    if (filterType === 'firstLetter' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas') {
      searchMeals();
    } else if (pathname === '/bebidas') {
      searchDrinks();
    }
  };

  const doSearch = () => {
    if (filterType && searchInput) {
      handleSearch();
    } else {
      alert('Preencha o campo de busca e de filtro!');
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="search-bar"
          onChange={ ({ target }) => setFilterType(target.value) }
          type="radio"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="search-bar"
          onChange={ ({ target }) => setFilterType(target.value) }
          value="name"
          type="radio"
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          name="search-bar"
          onChange={ ({ target }) => setFilterType(target.value) }
          value="firstLetter"
          type="radio"
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ () => doSearch() }
        type="button"
      >
        Pesquisar
      </button>
    </div>
  );
}
