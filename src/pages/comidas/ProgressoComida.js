import React from 'react';

class ProgressoComida extends React.Component {
  render() {
    return (
      <div>
        {/* <img src="" data-testid="recipe-photo" /> */}
        <h1 data-testid="recipe-title"> Titulo </h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category"> Texto</p>
        {/* <ul data-testid="${index}-ingredient-step">
        <li>Ingredientes</li>
      </ul> */}
        <p data-testid="instructions"> Modo de preparo</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Favoritar
        </button>
      </div>);
  }
}

export default ProgressoComida;
