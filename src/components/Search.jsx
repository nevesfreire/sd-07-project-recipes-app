import React, { useState, useContext } from 'react';

import { fetchAPIFoodsFilters, fetchAPIDrinksFilters } from '../services/api';
import { useTitleContext } from '../context/TitleContext';
import RecipesContext from '../context/RecipesContext';

function Search() {
  const { foodsOrDrinksList, setFoodsOrDrinksList } = useContext(RecipesContext);
  const { titleHeaderName } = useTitleContext();
  const [search, setSearch] = useState('');
  const [radioSelected, setRadioSelected] = useState('');

  async function fetchAPI() {
    if (search === '' && radioSelected === '') {
      return setFoodsOrDrinksList(foodsOrDrinksList);
    }

    if (radioSelected === 'firstLetter' && search.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (titleHeaderName.title.toLowerCase() === 'comidas') {
      const listFoods = await fetchAPIFoodsFilters(search, radioSelected);
      if (listFoods !== null) {
        setFoodsOrDrinksList(listFoods);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    } else {
      const listDrinks = await fetchAPIDrinksFilters(search, radioSelected);
      if (listDrinks !== null) {
        setFoodsOrDrinksList(listDrinks);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
      />
      <div>
        <label htmlFor="searchRadio">
          <input
            type="radio"
            value="ingredient"
            name="searchRadio"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setRadioSelected(e.target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="searchRadio">
          <input
            type="radio"
            value="name"
            name="searchRadio"
            data-testid="name-search-radio"
            onChange={ (e) => setRadioSelected(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="searchRadio">
          <input
            type="radio"
            value="firstLetter"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setRadioSelected(e.target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchAPI() }
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
