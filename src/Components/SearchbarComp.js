import React, { useContext } from 'react';
import RecipesContext from '../providers/Context/Context';

const SearchBarComp = () => {
  const {
    searchWithFilter,
    setInputText,
  } = useContext(RecipesContext);

  const inputSearch = () => {
    searchWithFilter();
  };

  return (
    <div>
      <input type="text" data-testid="search-input" />
      <div>
        <input
          type="radio"
          id="Ingredient"
          name="elementsForSearch"
          value="Ingrediente"
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="Ingredient">Ingrediente</label>
        <input
          type="radio"
          id="Nome"
          name="elementsForSearch"
          value="Nome"
          data-testid="name-search-radio"
        />
        <label htmlFor="Nome">Nome</label>
        <input
          type="radio"
          id="firtLetter"
          name="elementsForSearch"
          value="Primeira letra"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="firtLetter">Primeira letra</label>
      </div>
      <button data-testid="exec-search-btn" type="button" onClick={ () => { inputSearch(); } }>
        Buscar
      </button>
    </div>
  );
};
export default SearchBarComp;
