import React from 'react';

function RecipeDone() {
  const index = 1;
  const tagName = 1;
  return (
    <div>
      <div>
        <button type="button" data-testid="filter-by-all-btn"> All </button>
        <button type="button" data-testid="filter-by-food-btn"> Food </button>
        <button type="button" data-testid="filter-by-drink-btn"> Drinks </button>
      </div>
      <img data-testid={ `${index}-horizontal-image` } src="teste" alt="teste" />

      <span data-testid={ `${index}-horizontal-top-text` }>
        texto da categoria da receita
      </span>
      <span data-testid={ `${index}-horizontal-name` }>
        texto do nome da receita
      </span>
      <span data-testid={ `${index}-horizontal-done-date` }>
        texto da data que a receita foi feita
      </span>

      <div>
        <span data-testid={ `${index}-horizontal-share-btn` }>
          texto da data que a receita foi feita
        </span>

        <span data-testid={ `${index}-${tagName}-horizontal-tag` }>
          tag
        </span>
      </div>
    </div>
  );
}

export default RecipeDone;
