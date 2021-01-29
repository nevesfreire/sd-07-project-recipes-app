import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CupNodesContext } from '../contexts';
import { SUBMIT_SEARCH } from '../reducers';

export default function SearchBar2({ title }) {
  const { dispatchFilter } = useContext(CupNodesContext);

  const initialState = { text: '', option: '', title };
  const [state, setState] = useState(initialState);

  const handleChange = ({ target: { value, id: key } }) => {
    setState({ ...state, [key]: value });
  };

  const onSubmitFilters = () => {
    if (state.option === 'primeiraLetra' && state.text.length > 1) {
      console.log('Sua busca deve conter somente 1 (um) caracter');
    }
    dispatchFilter({ type: SUBMIT_SEARCH, payload: state });
  };
  return (
    <div>
      <input
        id="text"
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
      />
      <div onChange={ handleChange }>
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            id="option"
            type="radio"
            value="ingrediente"
            name="options"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome
          <input
            id="option"
            type="radio"
            value="nome"
            name="options"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            id="option"
            type="radio"
            value="primeiraLetra"
            name="options"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={ onSubmitFilters }
        data-testid="exec=search-btn"
      >
        Buscar...
      </button>
    </div>

  );
}

SearchBar2.propTypes = {
  title: PropTypes.string.isRequired,
};
