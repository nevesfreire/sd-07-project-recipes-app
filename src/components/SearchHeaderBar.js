import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getFoodFirstLetter,
  getFoodIngredients,
  getFoodName,
  getDrinkFirstLetter,
  getDrinkName,
  getDrinkIngredients,
} from '../services/Api';
import RecipeContext from '../context/RecipeContext';

function SearchHeaderBar() {
  const [valueInput, setValueInput] = useState();
  const [valueRadio, setValueRadio] = useState();
  const { location: { pathname }, push } = useHistory();
  const { data, setData } = useContext(RecipeContext);

  const getApi = async () => {
    switch (valueRadio) {
    case ('ingredient'):
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodIngredients(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkIngredients(valueInput) });

    case ('name'):
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodName(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkName(valueInput) });

    case ('firstLetter'):
      if (valueInput.length > 1) {
        return window.alert(
          'Sua busca deve conter somente 1 (um) caracter',
        );
      }
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodFirstLetter(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkFirstLetter(valueInput) });
    default:
      break;
    }
  };

  return (
    <div>
      {
        (data.food.length === 1) && push(`/comidas/${data.food[0].idMeal}`)
      }
      {
        (data.drink.length === 1) && push(`/bebidas/${data.drink[0].idDrink}`)
      }
      <div>
        <label htmlFor="search-input">
          <input
            id="search-input"
            data-testid="search-input"
            type="text"
            onChange={ (event) => setValueInput(event.target.value) }
          />
        </label>

        <div>
          <label htmlFor="radio">
            <input
              id="radio"
              name="radio"
              data-testid="ingredient-search-radio"
              type="radio"
              value="ingredient"
              onChange={ (event) => setValueRadio(event.target.value) }
            />
            Ingrediente

            <input
              id="radio"
              name="radio"
              data-testid="name-search-radio"
              type="radio"
              value="name"
              onChange={ (event) => setValueRadio(event.target.value) }
            />
            Nome

            <input
              id="radio"
              name="radio"
              data-testid="first-letter-search-radio"
              type="radio"
              value="firstLetter"
              onChange={ (event) => setValueRadio(event.target.value) }
            />
            Primeira letra
          </label>

          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => getApi() }
          >
            Buscar
          </button>
        </div>

      </div>
    </div>
  );
}

export default SearchHeaderBar;
