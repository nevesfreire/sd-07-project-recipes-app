import React, { useContext, useEffect } from 'react';
import RecipeContext from '../Context/Context';

function DetailsDrink() {
  const { detailsRecipe, setDetailsRecipe } = useContext(RecipeContext);
  console.log('detailsDrink');
  return (
    <div>
      <p>ascadvdc</p>
      {/* <img src={detailsRecipe.image} data-testid="recipe-photo" />
      <h1 data-testid="recipe-title"></h1>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria da receita</p>
      <p data-testid="${index}ingredient-name-and-measure">Ingredientes</p>
      <p data-testid="instructions">Instruções</p>
      <video data-testid="video" width="100">
        <source src="" type="video/mp4" />
      </video>
      <div data-testid="${index}-recomendation-card">CARD Receitas recomendadas</div>
      <button data-testid="start-recipe-btn">Iniciar receita</button> */}
    </div>
  );
}

export default DetailsDrink;
