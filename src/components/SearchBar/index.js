import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';
import { fetchApi } from '../../services/api';

import './style.css';

function SearchBar({ history }) {
  const { api, setResults, setIsFetching } = useContext(Context);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchApi(search, filter, api);
    if (!data) return;
    if (data.length === 1) {
      if (api === 'meal') history.push(`/comidas/${data[0].idMeal}`);
      else history.push(`/bebidas/${data[0].idDrink}`);
    } else {
      setResults(data);
      setIsFetching(true);
    }
  };

  return (
    <form className="search__form" onSubmit={ handleSearch }>
      <div className="search__block">
        <input
          className="search__input"
          value={ search }
          placeholder="Buscar Receita"
          onChange={ ({ target }) => setSearch(target.value) }
          type="text"
          data-testid="search-input"
        />
      </div>
      <div className="search__block__group">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            className="search__input--radio"
            name="search-radio"
            required
            onChange={ ({ target }) => setFilter(target.value) }
            value="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            id="name"
            className="search__input--radio"
            value="name"
            name="search-radio"
            onChange={ ({ target }) => setFilter(target.value) }
            required
            data-testid="name-search-radio"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            className="search__input--radio"
            value="first-letter"
            name="search-radio"
            required
            onChange={ ({ target }) => setFilter(target.value) }
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="submit"
        className="search__button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchBar;
