import React, { Component } from 'react';

class Searchbar extends Component {
  render() {
    return (
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Busca"
        />
        <label htmlFor="ingredient">
          <input
            name="busca"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            name="busca"
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            name="busca"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </button>
      </div>
    );
  }
}

export default Searchbar;
