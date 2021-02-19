import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchingFoods, fetchingDrinks } from '../../services/mandaFoods';
import '../../App.css';

export default function SearchBar() {
  const {
    inputValues,
    setInputValues,
    setMeals,
    setDrinks,
    meals,
    drinks,
  } = useContext(RecipesContext);

  const handleInputRadio = ({ target: { value } }) => {
    setInputValues({ ...inputValues, radio: value });
  };

  const handleChangeInput = ({ target: { value } }) => {
    setInputValues({ ...inputValues, input: value });
  };

  const { location, push } = useHistory();

  const filterButton = async () => {
    const { pathname } = location;
    if (pathname === '/comidas') {
      const foods = await fetchingFoods(inputValues.radio, inputValues.input);
      if (foods) {
        if (foods.length === 1) push(`/comidas/${foods[0].idMeal}`);
        setMeals(foods);
      } else {
        setMeals(meals);
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    } else if (pathname === '/bebidas') {
      const drink = await fetchingDrinks(inputValues.radio, inputValues.input);
      if (drink) {
        if (drink.length === 1) push(`/bebidas/${drink[0].idDrink}`);
        setDrinks(drink);
      } else {
        setDrinks(drinks);
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-input">
        <input
          type="text"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ handleChangeInput }
        />
      </div>
      <label className="search-bar-radio" htmlFor="ingrediente">
        <input
          type="radio"
          name="search"
          value="Ingrediente"
          id="1"
          data-testid="ingredient-search-radio"
          onClick={ handleInputRadio }
        />
        Ingrediente
      </label>

      <label className="search-bar-radio" htmlFor="nome">
        <input
          type="radio"
          name="search"
          value="Nome"
          id="2"
          data-testid="name-search-radio"
          onClick={ handleInputRadio }
        />
        Nome
      </label>

      <label className="search-bar-radio" htmlFor="PrimeiraLetra">
        <input
          type="radio"
          name="search"
          value="PrimeiraLetra"
          id="3"
          data-testid="first-letter-search-radio"
          onClick={ handleInputRadio }
        />
        Primeira Letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ filterButton }
      >
        Buscar
      </button>
    </div>
  );
}
