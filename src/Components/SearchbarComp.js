import React, { useContext } from 'react';

const SearchBarComp = () =>
// const {
//   searchBar,
//   changeSearchBarState,
// } = useContext(RecipesContext);

  (
    <div>
      <input type="text" data-testid="search-input" />
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
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
export default SearchBarComp;
