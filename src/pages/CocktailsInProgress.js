import React from 'react';

function CocktailsInProgress() {
  return (
    <div>
      <img data-testid="recipe-photo" alt="Foto" />
      <h1 data-testid="recipe-title">{ }</h1>
      <button data-testid="share-btn" type="button">A</button>
      <button data-testid="favorite-btn" type="button">B</button>
      <spam data-testid="recipe-category">Xablau</spam>
      <h4>Instructions</h4>
      <p data-testid="instructions">Xablau</p>
      <button data-testid="finish-recipe-btn" type="button">C</button>
    </div>
  );
}

export default CocktailsInProgress;
