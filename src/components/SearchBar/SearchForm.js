import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ title }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('i');
  const [inputQuery, setInputQuery] = useState('');

  const handleQuery = async () => {
    if (title === 'Comidas') {
      if (query === 'i') {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputQuery}`);
        const response = await request.json();
        if (response.meals === null) {
          return alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
        return setData(response);
      }
      if (query === 'f' && inputQuery.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${query}=${inputQuery}`);
      const response = await request.json();
      if (response.meals === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      return setData(response);
    }
  };
  console.log(data);

  return (
    <div>
      <form>
        <div>
          <lable htmlFor="search-input">
            <input
              id="search-input"
              type="text"
              name="search-input"
              data-testid="search-input"
              onChange={ ({ target: { value } }) => { setInputQuery(value); } }
            />
          </lable>
        </div>
        <div>
          <lable htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              value="ingredient"
              name="search-radio"
              data-testid="ingredient-search-radio"
              onChange={ () => setQuery('i') }
            />
            Ingredient
          </lable>
          <lable htmlFor="name">
            <input
              id="name"
              type="radio"
              value="name"
              name="search-radio"
              data-testid="name-search-radio"
              onChange={ () => setQuery('s') }
            />
            Name
          </lable>
          <lable htmlFor="first-letter">
            <input
              id="first-letter"
              type="radio"
              value="first-letter"
              name="search-radio"
              data-testid="first-letter-search-radio"
              onChange={ () => setQuery('f') }
            />
            First Letter
          </lable>
          <button
            data-testid="exec-search-btn"
            onClick={ handleQuery }
            type="button"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

SearchForm.propTypes = { title: PropTypes.string.isRequired };

export default SearchForm;
