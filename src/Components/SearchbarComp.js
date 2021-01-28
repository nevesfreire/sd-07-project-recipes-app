import React, { useContext } from 'react';
import RecipesContext from '../providers/Context/Context';

const SearchBarComp = () => {
  const {
    searchWithFilter,
    setInputText,
    setRadioType,
  } = useContext(RecipesContext);

  const inputSearch = () => {
    searchWithFilter();
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => { setInputText(target.value); } }
      />
      <div>
        <label htmlFor="Ingredient">
          <input
            type="radio"
            id="Ingredient"
            name="elementsForSearch"
            value="Ingrediente"
            data-testid="ingredient-search-radio"
            onClick={ () => { setRadioType('Ingrediente'); } }
          />
          Ingrediente
        </label>
        <label htmlFor="Nome">
          <input
            type="radio"
            id="Nome"
            name="elementsForSearch"
            value="Nome"
            data-testid="name-search-radio"
            onClick={ () => { setRadioType('Nome'); } }
          />
          Nome
        </label>
        <label htmlFor="firtLetter">
          <input
            type="radio"
            id="firtLetter"
            name="elementsForSearch"
            value="Primeira letra"
            data-testid="first-letter-search-radio"
            onClick={ () => { setRadioType('firtLetter'); } }
          />
          Primeira letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => { inputSearch(); } }
      >
        Buscar
      </button>
    </div>
  );
};
export default SearchBarComp;
