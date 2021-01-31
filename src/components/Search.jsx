import React, { useState, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';

import { fetchAPIFoodsFilters, fetchAPIDrinksFilters } from '../services/api';
import { useTitleContext } from '../context/TitleContext';
import RecipesContext from '../context/RecipesContext';

function Search() {
  const { setFoodsOrDrinksList } = useContext(RecipesContext);
  const { titleHeaderName } = useTitleContext();
  const [search, setSearch] = useState('');
  const [radioSelected, setRadioSelected] = useState('');
  const [alertAPI, setAlertAPI] = useState(false);

  async function fetchAPI() {
    if (radioSelected === 'firstLetter' && search.length !== 1) {
      setFoodsOrDrinksList([]);
      setAlertAPI(true);
      return;
    }

    setAlertAPI(false);

    if (titleHeaderName.title.toLowerCase() === 'comidas') {
      const listFoods = await fetchAPIFoodsFilters(search, radioSelected);
      setFoodsOrDrinksList(listFoods);
    } else {
      const listDrinks = await fetchAPIDrinksFilters(search, radioSelected);
      setFoodsOrDrinksList(listDrinks);
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
      {alertAPI ? (
        <Alert variant="warning">
          Sua busca deve conter somente 1 (um) caracter
        </Alert>
      ) : <div />}
    </div>
  );
}

export default Search;
