import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

const SearchBar = () => {
  const {
    recipesInput,
    handleRadioChange,
    handleRecipesInput,
    handleClickFood,
    handleClickDrink } = useContext(RecipesContext);

  const LocationDisplay = useLocation().pathname;

  let funcFood = false;
  let funcDrink = false;

  if (LocationDisplay === '/comidas') {
    funcFood = true;
  }
  if (LocationDisplay === '/bebidas') {
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
        onClick={ funcFood && handleClickFood || funcDrink && handleClickDrink }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
