import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import meals from '../../services/meals-api';
import CardMeals from '../CardMeals/CardMeals';

function SearchBarByFood(props) {
  const { searchValue } = props;
  const [meal, setMeal] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();
  const firstLetter = 'Primeira letra';
  const maxCard = 12;
  function searchByFood(event) {
    if (event.target.value === 'Ingredientes') {
      setRadio('Ingredientes');
    } else if (event.target.value === 'Nome') {
      setRadio('Nome');
    } else {
      setRadio(firstLetter);
    }
  }
  function verifyIsNull(response) {
    if (response === 'undefined' || response === 'null') {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }
  function verifyIsEqual1(response) {
    if (response.length === 1) {
      const id = Object.entries(response)[0][1].idMeal;
      console.log(id);
      return history.push(`/comidas/${id}`);
    }
  }

  async function handlerClick() {
    if (radio === 'Ingredientes') {
      const response = await meals.searchMealsByIngredient(searchValue, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setMeal(response);
    }
    if (radio === 'Nome') {
      const response = await meals.searchMealsByName(searchValue, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
      setMeal(response);
    }
    if (radio === firstLetter && searchValue.length === 1) {
      const response = await meals.searchMealsByFirstLetter(searchValue, maxCard);
      verifyIsNull(response);
      verifyIsEqual1(response);
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
        { Object.entries(meal).map((item, index) => (

          <CardMeals
            data-testid={ `${index}-recipe-card` }
            key={ index }
            index={ index }
            item={ item[1] }
          />
        ))}
      </div>
    </div>

  );
}
SearchBarByFood.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
export default SearchBarByFood;
// {isFetching && meal.map((item, index) => (
//   <CardMeals key={ index } item={ item } />
// ))}
