import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodFilterName,
  requestApiFoodFilterFirstLetter,
} from '../services/requestFood';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkFilterName,
  requestApiDrinkFilterFirstLetter,
} from '../services/requestDrink';

function HeaderSearch({ name }) {
  const [textSearch, setTextSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [click, setClick] = useState(false);
  const [redirectFood, setRedirectFood] = useState(false);
  const [redirectDrink, setRedirectDrink] = useState(false);

  const {
    setCardDrink,
    setCardFood,
    cardDrink,
    cardFood,
  } = useContext(CoffeAndCodeContext);

  const searchFood = () => {
    if (radioValue === 'ingredientSearch' && textSearch !== '') {
      return requestApiFoodFilterIngredient(textSearch);
    }
    if (radioValue === 'nameSearch' && textSearch !== '') {
      return requestApiFoodFilterName(textSearch);
    }
    if (radioValue === 'firstLetterSearch' && textSearch.length === 1) {
      return requestApiFoodFilterFirstLetter(textSearch);
    }
    if (radioValue === 'firstLetterSearch') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const searchDrink = () => {
    if (radioValue === 'ingredientSearch' && textSearch !== '') {
      return requestApiDrinkFilterIngredient(textSearch);
    }
    if (radioValue === 'nameSearch' && textSearch !== '') {
      return requestApiDrinkFilterName(textSearch);
    }
    if (radioValue === 'firstLetterSearch' && textSearch.length === 1) {
      return requestApiDrinkFilterFirstLetter(textSearch);
    }
    if (radioValue === 'firstLetterSearch') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const printError = () => {
    setClick(false);
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const searchOnClick = async () => {
    setClick(true);
    if (name === 'Comidas') {
      const answerApi = await searchFood();
      console.log(answerApi);

      if (answerApi) setCardFood(answerApi);
      else printError();
      // answerApi ? setCardFood(answerApi) : printError();
    }
    if (name === 'Bebidas') {
      const answerApi = await searchDrink();
      if (answerApi) setCardDrink(answerApi);
      else printError();
      // answerApi ? setCardDrink(answerApi) : printError();
    }
  };

  useEffect(() => {
    if (click) {
      setClick(false);
      if (cardFood.length === 1) setRedirectFood(true);
      if (cardDrink.length === 1) setRedirectDrink(true);
    }
  }, [cardDrink, cardFood]);

  if (redirectDrink) return <Redirect to={ `/bebidas/${cardDrink[0].idDrink}` } />;

  if (redirectFood) return <Redirect to={ `/comidas/${cardFood[0].idMeal}` } />;

  return (
    <section>
      <div>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ (event) => setTextSearch(event.target.value) }
        />
      </div>
      <div>
        <label htmlFor="ingredientSearch">
          <input
            type="radio"
            name="searchFilter"
            id="ingredientSearch"
            data-testid="ingredient-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
          />
          Ingrediente
        </label>
        <label htmlFor="nameSearch">
          <input
            type="radio"
            name="searchFilter"
            id="nameSearch"
            data-testid="name-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
          />
          Nome
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            name="searchFilter"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            onClick={ (event) => setRadioValue(event.target.id) }
          />
          Primeira letra
        </label>
      </div>

      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ searchOnClick }
        >
          Buscar
        </button>
      </div>
    </section>
  );
}

HeaderSearch.propTypes = { name: PropTypes.string.isRequired };

export default HeaderSearch;
