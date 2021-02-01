import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import RequestData from '../../services/RequestAPI';

const SearchBar = () => {
  const zero = 0;
  const { setData } = useContext(Context);

  const [recipesInput, setRecipesInput] = useState('');
  const [recipesRadio, setRecipesRatio] = useState('');

  const handleRecipesInput = (event) => {
    setRecipesInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRecipesRatio(event.target.value);
  };

  const { location, push } = useHistory();

  let mealOrCoktail = 'cocktail';
  let mealOrDrink = 'drink';

  if (location.pathname === '/comidas') {
    mealOrCoktail = 'meal';
    mealOrDrink = 'meal';
  }

  let URL = '';
  let RequestedAPI;

  const Request = async (url) => {
    RequestedAPI = await RequestData(url);
    if (RequestedAPI[`${mealOrDrink}s`] === null) {
      RequestedAPI[`${mealOrDrink}s`] = undefined;
    }
    setData(RequestedAPI[`${mealOrDrink}s`]);
    return (RequestedAPI[`${mealOrDrink}s`]);
  };

  const handleClick = async () => {
    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      Request(URL);
      break;
    case 'Nome':
      URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/search.php?s=${recipesInput}`;
      RequestedAPI = await Request(URL);
      if (RequestedAPI === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (RequestedAPI.length === 1) {
        let id = `id${mealOrDrink.replace(mealOrDrink.charAt(zero),
          mealOrDrink.charAt(zero).toUpperCase())}`;
        id = RequestedAPI[0][id];
        push(`${location.pathname}/${id}`);
      }
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/search.php?f=${recipesInput}`;
        Request(URL);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ recipesInput }
        onChange={ handleRecipesInput }
      />
      <div
        onChange={ handleRadioChange }
      >
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingrediente"
          name="search"
        />
        Ingrediente
        <input
          data-testid="name-search-radio"
          type="radio"
          value="Nome"
          name="search"
        />
        Nome
        <input
          type="radio"
          value="Primeira letra"
          data-testid="first-letter-search-radio"
          name="search"
        />
        Primeira letra
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
