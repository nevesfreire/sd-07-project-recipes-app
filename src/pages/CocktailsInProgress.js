import React from 'react';

function CocktailsInProgress() {
  return (
    <div>
      <img data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{}</h1>
      <button data-testid="share-btn" type="button"></button>
      <button data-testid="favorite-btn" type="button"></button>
      <spam data-testid="recipe-category"></spam>
      <h4>Instructions</h4>
      <p data-testid="instructions"></p>
      <button data-testid="finish-recipe-btn" type="button"></button>
    </div>
  )
}

export default CocktailsInProgress;
