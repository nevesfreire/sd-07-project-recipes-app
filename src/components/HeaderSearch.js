import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealsByIngredient } from '../actions/meals';

function HeaderSearch({
  toggle,
  title,
  searchMealsByIngredient,
  meals,
}) {
  const [word, setWord] = useState('');
  const [options, setOptions] = useState('');

  const changeInputs = ({ target }) => {
    const { value, name } = target;
    if (name === 'word') setWord(value);
    if (name === 'options') setOptions(value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (title === 'Comidas') {
      if (options === 'ingredient') {
        searchMealsByIngredient(word);
      }
    }
    if (title === 'Bebidas') {

    }
  };

  console.log(meals)

  return (
    <div style={ { display: toggle ? 'inline' : 'none' } }>
      <label htmlFor="busca">
        <input
          id="busca"
          name="word"
          value={ word }
          data-testid="search-input"
          onChange={ changeInputs }
          maxLength={ options === 'first-letter' ? '1' : '100' }
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
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ searchToggleReducer, meals }) => ({
  toggle: searchToggleReducer,
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsByIngredient: (ingredient) => dispatch(fetchMealsByIngredient(ingredient)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
