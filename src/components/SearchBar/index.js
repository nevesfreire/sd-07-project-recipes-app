import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import RequestData from '../../services/RequestAPI';

const SearchBar = () => {
  const {
    recipesInput,
    recipesRadio,
    handleRecipesInput,
    handleRadioChange } = useContext(RecipesContext);

  const { location, push } = useHistory();
  console.log(location.pathname);

  let URL = '';
  let xablau;

  const handleClickFood = async () => {
    await console.log('Food');
    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      await fetch(URL)
        .then((r) => r.json())
        .then((r) => {
          if (r.meals.length !== 1) {
            console.log(r);
            console.log(r.meals.length);
          } else console.log('1');
        });
      break;
    case 'Nome':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipesInput}`;
      xablau = await RequestData(URL);
      if (xablau.meals.length === 1) {
        push(`/comidas/${xablau.meals[0].idMeal}`);
      }
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipesInput}`;
        await fetch(URL)
          .then((r) => r.json())
          .then((r) => console.log(r));
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  const handleClickDrink = async () => {
    console.log('Drink');
    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      fetch(URL)
        .then((r) => r.json())
        .then((r) => console.log(r));
      break;
    case 'Nome':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipesInput}`;
      xablau = await RequestData(URL);
      console.log(xablau.drinks[0].idDrink);
      console.log(xablau.drinks)
      if (xablau.drinks.length === 1) {
        push(`/bebidas/${xablau.drinks[0].idDrink}`);
      }
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${recipesInput}`;
        fetch(URL)
          .then((r) => r.json())
          .then((r) => console.log(r));
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  let funcFood = false;
  let funcDrink = false;

  if (location.pathname === '/comidas') {
    funcFood = true;
  }

  if (location.pathname === '/bebidas') {
    funcDrink = true;
  }

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
        // onClick={ handleClickFood }
        onClick={ funcFood && handleClickFood || funcDrink && handleClickDrink }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
