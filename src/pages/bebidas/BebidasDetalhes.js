import React from 'react';

export default class BebidasDetalhes extends React.Component {
  render() {
    return (
      <div>
        {/* <img data-testid="recipe-photo" src="" /> */}

        <h1 data-testid="recipe-title"> titulo</h1>

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
        <p data-testid="recipe-category"> Texto </p>
        <p data-testid=""/* "${index}-ingredient-name-and-measure" */>Ingredientes</p>
        <p data-testid="instructions"> ingredientes</p>
        {/* <video data-testid="video" width="100px" height="100px">
          <source
            src=""
            type="video"
          />
        </video> */}
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar receita
        </button>
      </div>);
  }
}
