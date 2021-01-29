import React, { useContext } from 'react';
import RecipesContext from '../../context/Provider';

const SearchBar = () => {
  const {
    ingredient,
    Ingrediente,
  } = useContext(RecipesContext);
  return (
    <div>
      <form>
        <input data-testid="search-input" placeholder="Buscar Receita" />
        <div className="radio">
          <label htmlFor="ingredient-search-radio">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="Ingrediente"
              id="ingredient-search-radio"
              // checked={ Ingrediente }
              onChange={ Ingrediente }
            />
            Ingrediente
          </label>

          <label htmlFor="ingredient-search-radio">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="Nome"
              id="ingredient-search-radio"
              // checked={ Ingrediente }
              onChange={ Ingrediente }
            />
            Nome
          </label>

          <label htmlFor="ingredient-search-radio">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="Primeira letra"
              id="ingredient-search-radio"
              // checked={ Ingrediente }
              onChange={ Ingrediente }
            />
            Primeira letra
          </label>
        </div>
        <div>
          <button type="button">Buscar</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
