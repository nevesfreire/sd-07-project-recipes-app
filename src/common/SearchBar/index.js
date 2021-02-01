import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { searchGeneral } from '../../services/API';

const SearchBar = () => {
  const [searchBarData, setSearchBarData] = useState({ text: '', option: '' });
  const { setFilteredMeals,
    setFilteredDrinks,
    setIsUsingSearchBar } = useContext(AppContext);

  const radioClick = ({ target }) => setSearchBarData({
    ...searchBarData,
    option: target.id,
  });

  const searchClick = async () => {
    const path = window.location.pathname;
    console.log('clicou na busca');
    setIsUsingSearchBar(true);
    const data = await searchGeneral(searchBarData);
    if (path === '/comidas')setFilteredMeals(data);
    if (path === '/bebidas')setFilteredDrinks(data);
  };

  return (
    <form data-testid="search-top-btn">
      <input
        type="text"
        data-testid="search-input"
        value={ searchBarData.text }
        onChange={ ({ target }) => setSearchBarData({
          ...searchBarData,
          text: target.value,
        }) }
      />
      <br />
      <label
        htmlFor="ingrediente"
      >
        <input
          name="options"
          id="ingrediente"
          type="radio"
          data-testid="ingredient-search-radio"
          onClick={ radioClick }
        />
        Ingrediente
      </label>
      <br />
      <label htmlFor="nome">
        <input
          name="options"
          id="nome"
          type="radio"
          data-testid="name-search-radio"
          onClick={ radioClick }
        />
        Nome
      </label>
      <br />
      <label htmlFor="primeira letra">
        <input
          name="options"
          id="primeira letra"
          type="radio"
          data-testid="first-letter-search-radio"
          onClick={ radioClick }
        />
        Primeira letra
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchClick }
      >
        Buscar
      </button>
    </form>

  );
};

export default SearchBar;
