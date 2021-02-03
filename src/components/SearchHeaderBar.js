import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function SearchHeaderBar() {
  const [valueInput, setValueInput] = useState();
  const [valueRadio, setValueRadio] = useState();
  const { location: { pathname } } = useHistory();
  const { getApi } = useContext(RecipeContext);

  return (
    <div className="search-bar">
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
            onClick={ () => getApi(valueRadio, pathname, valueInput) }
          >
            Buscar
          </button>
        </div>

      </div>
    </div>
  );
}

export default SearchHeaderBar;
