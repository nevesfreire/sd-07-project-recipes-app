import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeContext } from '../../context/RecipeContext';

async function fetchFrom(radio, history, key, setSearched) {
  const response = await fetch(radio).then((data) => data.json());
  const min = 0;
  const max = 12;
  if (response[key] === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (response[key].length === 1) {
    if (key === 'meals') {
      history.push(`/comidas/${response[key][0].idMeal}`);
    } else if (key === 'drinks') {
      history.push(`/bebidas/${response[key][0].idDrink}`);
    }
  } else {
    setSearched(response[key].slice(min, max));
  }
}

function SearchBar(props) {
  const { setSearched } = useContext(RecipeContext);
  const { location, history } = props;
  const { pathname } = location;
  const [radio, setRadio] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [input, setInput] = useState('');
  let ingredientSearch = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  let nameSearch = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  let firstSearch = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  let key = 'meals';
  if (pathname === '/bebidas') {
    key = 'drinks';
    ingredientSearch = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    nameSearch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    firstSearch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  }
  return (
    <div>
      <input
        data-testid="search-input"
        onChange={ (e) => setInput(e.target.value) }
      />
      <input
        onClick={ () => setRadio(ingredientSearch) }
        data-testid="ingredient-search-radio"
        name="searchType"
        type="radio"
      />
      <input
        onClick={ () => setRadio(nameSearch) }
        data-testid="name-search-radio"
        name="searchType"
        type="radio"
      />
      <input
        onClick={ () => setRadio(firstSearch) }
        data-testid="first-letter-search-radio"
        name="searchType"
        type="radio"
      />
      <Button
        onClick={ () => {
          if (radio === firstSearch && input.length !== 1) {
            alert('Sua busca deve conter somente 1 (um) caracter');
          } else {
            fetchFrom(`${radio}${input}`, history, key, setSearched);
          }
        } }
        data-testid="exec-search-btn"
      >
        Search
      </Button>
    </div>);
}

SearchBar.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(SearchBar);
