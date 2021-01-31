import React from 'react';
import './style/SearchHeader.css';

function SearchHeader() {
  return (
    <form>
      <div className="search-header-container">
        <input
          className="search-header-search-bar"
          name="input"
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          // onChange={}
        />
        <div>
          <button
            className="search-header-search-btn"
            type="button"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="search-header-radio-btn-container">
        <label htmlFor="ingredients">
          <input
            name="input"
            value="ingredients"
            id="ingredients"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingredientes
        </label>

        <label htmlFor="name">
          <input
            name="input"
            value="name"
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>

        <label htmlFor="first-letter">
          <input
            name="input"
            value="first-letter"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
    </form>
  );
}

export default SearchHeader;
