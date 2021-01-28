import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Context } from '../../context/Provider';
import fetchApi from '../../services/api';

function SearchBar({ history }) {
  const { api, setResults, setIsFetching } = useContext(Context);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchApi(search, filter, api);
    if (!data) return;
    console.log(data);
    if (data.length === 1) {
      if (api === 'meal') history.push(`/comidas/${data[0].idMeal}`);
      else history.push(`/bebidas/${data[0].idDrink}`);
    } else {
      setResults(data);
      setIsFetching(true);
    }
  };

  return (
    <Form onSubmit={ handleSearch }>
      <Form.Group>
        <input
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          type="text"
          data-testid="search-input"
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
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
            value="first-letter"
            name="search-radio"
            required
            onChange={ ({ target }) => setFilter(target.value) }
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </Form.Group>
      <Button
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchBar;
