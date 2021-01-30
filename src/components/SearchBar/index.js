import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

const SearchBar = () => {
  const {
    recipesInput,
    handleRadioChange,
    handleRecipesInput,
    handleClick,
    data } = useContext(RecipesContext);
    console.log(data);
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
          data-testid="ingredient-search-radio"
          name="search"
          checked
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
