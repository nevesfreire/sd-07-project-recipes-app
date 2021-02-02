import React from 'react';

const FoodExplore = () => (
  <div>
    <h1>Página de explorar comidas</h1>
    <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
  </div>
);

export default FoodExplore;
