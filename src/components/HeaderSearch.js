import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function HeaderSearch({ toggle }) {
  const [word, setWord] = useState('');
  const [options, setOptions] = useState('');

  const changeInputs = ({ target }) => {
    const { value, name } = target;
    if (name === 'word') setWord(value);
    if (name === 'options') setOptions(value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={ `display: ${toggle ? 'inline' : 'none'}` }>
      <label htmlFor="busca">
        <input
          id="busca"
          name="word"
          value={ word }
          data-testid="search-input"
          onChange={ changeInputs }
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            id="ingredient"
            value="ingredient"
            type="radio"
            name="options"
            onChange={ changeInputs }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            value="name"
            type="radio"
            name="options"
            onChange={ changeInputs }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            id="first-letter"
            value="first-letter"
            type="radio"
            name="options"
            onChange={ changeInputs }
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handlerSubmit }
      >
        Buscar
      </button>
    </div>
  );
}

HeaderSearch.propTypes = {
  toggle: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ searchToggleReducer }) => ({
  toggle: searchToggleReducer,
});

export default connect(mapStateToProps)(HeaderSearch);
