import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import RequestData from '../../services/RequestAPI';

const SearchBar = () => {
  const {
    recipesInput,
    recipesRadio,
    setData,
    data,
    handleRecipesInput,
    handleRadioChange } = useContext(Context);

  const { location, push } = useHistory();

  // let funcFood = false;
  // let funcDrink = false;
  let mealOrCoktail = 'cocktail';
  let mealOrDrink = 'drink';

  if (location.pathname === '/comidas') {
    // funcFood = true;
    mealOrCoktail = 'meal';
    mealOrDrink = 'meal';
  }

  // if (location.pathname === '/bebidas') {
  //   funcDrink = true;
  // }

  let URL = '';
  let RequestedAPI;

  const Request = async (url) => {
    RequestedAPI = await RequestData(url);
    if (RequestedAPI[`${mealOrDrink}s`] === null) RequestedAPI[`${mealOrDrink}s`] = undefined;
    setData(RequestedAPI[`${mealOrDrink}s`]);
    return (RequestedAPI[`${mealOrDrink}s`]);
  };

  // const handleClickFood = async () => {
  //   await console.log('Food');
  //   switch (recipesRadio) {
  //   case 'Ingrediente':
  //     URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
  //     Request(URL);
  //     break;
  //   case 'Nome':
  //     URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipesInput}`;
  //     RequestedAPI = await RequestData(URL);
  //     if (RequestedAPI.meals.length === 1) {
  //       push(`/comidas/${RequestedAPI.meals[0].idMeal}`);
  //     }
  //     setData(RequestedAPI);
  //     break;
  //   case 'Primeira letra':
  //     if (recipesInput.length === 1) {
  //       URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipesInput}`;
  //       Request(URL);
  //     } else {
  //       alert('Sua busca deve conter somente 1 (um) caracter');
  //     }
  //     break;
  //   default:
  //     break;
  //   }
  // };

  // const handleClickDrink = async () => {
  //   console.log('Drink');
  //   switch (recipesRadio) {
  //   case 'Ingrediente':
  //     URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${recipesInput}`;
  //     Request(URL);
  //     break;
  //   case 'Nome':
  //     URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipesInput}`;
  //     RequestedAPI = await RequestData(URL);
  //     if (RequestedAPI.drinks.length === 1) {
  //       push(`/bebidas/${RequestedAPI.drinks[0].idDrink}`);
  //     }
  //     break;
  //   case 'Primeira letra':
  //     if (recipesInput.length === 1) {
  //       URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${recipesInput}`;
  //       Request(URL);
  //     } else {
  //       alert('Sua busca deve conter somente 1 (um) caracter');
  //     }
  //     break;
  //   default:
  //     break;
  //   }
  // };

  const handleClick = async () => {
    console.log('chamou');

    switch (recipesRadio) {
    case 'Ingrediente':
      URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/filter.php?i=${recipesInput}`;
      Request(URL);
      console.log(data);
      break;
    case 'Nome':
      URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/search.php?s=${recipesInput}`;
      RequestedAPI = await Request(URL);
      console.log(RequestedAPI);
      // const path = (mealOrCoktail === 'meal')
      //   ? RequestedAPI.meals[0].idMeal : RequestedAPI.drinks[0].idDrink

      // console.log(RequestedAPI[`${mealOrDrink}s`]);
      if (RequestedAPI === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (RequestedAPI.length === 1) {
        let id = `id${mealOrDrink.replace(mealOrDrink.charAt(0), mealOrDrink.charAt(0).toUpperCase())}`;
        id = RequestedAPI[0][id];
        console.log(id);
        console.log(`id${mealOrDrink.replace(mealOrDrink.charAt(0), mealOrDrink.charAt(0).toUpperCase())}`);
        push(`${location.pathname}/${id}`);
        // push(`${location.pathname}/${path}`);
      }
      break;
    case 'Primeira letra':
      if (recipesInput.length === 1) {
        URL = `https://www.the${mealOrCoktail}db.com/api/json/v1/1/search.php?f=${recipesInput}`;
        Request(URL);
        console.log(data);
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
        // onClick={ handleClickFood }
        // onClick={ funcFood && handleClickFood || funcDrink && handleClickDrink }
        onClick={ handleClick }
      >
        Buscar
      </button>

    </div>
  );
};

export default SearchBar;
