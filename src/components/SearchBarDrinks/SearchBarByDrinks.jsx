import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cocktails from '../../services/cocktails-api';

function SearchBarByDrinks(props) {
  const { searchValue } = props;
  const [drink, setDrink] = useState('');
  const [radio, setRadio] = useState('');
  const firstLetter = 'Primeira letra';

  console.log(`byDrinks${searchValue}`);
  function searchByDrinks(event) {
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
      const response = await cocktails.searchCocktailsByIngredient(searchValue);
      setDrink(response);
    }
    if (radio === 'Nome') {
      const response = await cocktails.searchCocktailsByName(searchValue);
      setDrink(response);
    }
    if (radio === firstLetter && searchValue.length === 1) {
      const response = await cocktails.searchCocktailsByFirstLetter(searchValue);
      setDrink(response);
    }
    if (radio === 'Primeira letra' && searchValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div>
      <div onChange={ (event) => searchByDrinks(event) }>
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
        {drink.map((obj)=>{
          <
        })}
      </div>
    </div>

  );
}
SearchBarByDrinks.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
export default SearchBarByDrinks;
