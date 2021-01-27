import React from 'react';

function AddInput() {
  return (
    <div>
      <input
        type="text"
        placeholder="busque aqui uma receita"
        data-testid="search-input"
      />

      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          name="radio-button"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>

      <label htmlFor="name">
        <input
          id="name"
          name="radio-button"
          data-testid="name-search-radio"
          type="radio"
        />
        Nome
      </label>

      <label htmlFor="first-letter">
        <input
          id="first-letter"
          name="radio-button"
          data-testid="first-letter-search-radio"
          type="radio"
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default AddInput;
