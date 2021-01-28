import React, { useState } from 'react';
import PropTypes from 'prop-types';
import meals from '../../services/meals-api';

function SearchBarByFood(props) {
  const { searchValue } = props;
  const [meal, setMeal] = useState('');
  const [radio, setRadio] = useState('');
  const firstLetter = 'Primeira letra';
  function searchByFood(event) {
    if (event.target.value === 'Ingredientes') {
      setRadio('Ingredientes');
    } else if (event.target.value === 'Nome') {
      setRadio('Nome');
    } else {
      setRadio(firstLetter);
    }
  }
  async function handlerClick() {
    if (radio === 'Ingredientes') {
      const response = await meals.searchMealsByIngredient(searchValue);
      setMeal(response);
    }
    if (radio === 'Nome') {
      const response = await meals.searchMealsByName(searchValue);
      setMeal(response);
    }
    if (radio === firstLetter && searchValue.length === 1) {
      const response = await meals.searchMealsByFirstLetter(searchValue);
      setMeal(response);
    }
    if (radio === 'Primeira letra' && searchValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div>
      <div onChange={ (event) => searchByFood(event) }>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredientes"
          name="foods"
        />
        {' '}
        Ingredientes
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Nome"
          name="foods"
        />
        {' '}
        Nome
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="Primeira letra"
          name="foods"
        />
        {' '}
        Primeira letra
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handlerClick }
        >
          Buscar
        </button>
      </div>
      <div>
        {console.log(meal)}
      </div>
    </div>

  );
}
SearchBarByFood.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
export default SearchBarByFood;
