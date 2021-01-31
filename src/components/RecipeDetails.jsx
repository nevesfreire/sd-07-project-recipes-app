import React from 'react';

import { Ingredient, Recomendations, Video } from './index';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ shareIcon }
          alt="Receita"
        />
      </div>
      <div>
        <h2
          data-testid="recipe-title"
        >
          Titulo
        </h2>
      </div>
      <div>
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Icone Compartilhar"
        />
      </div>
      <div>
        <button type="button">
          <img
            data-testid="favorite-btn"
            src={ favoriteIcon }
            alt="Icone Compartilhar"
          />
        </button>
      </div>
      <div>
        <p
          data-testid="recipe-category"
        >
          Categoria
        </p>
      </div>
      <Ingredient />
      <div>
        <p
          data-testid="instructions"
        >
          Instrucoes
        </p>
      </div>
      <Video />
      <Recomendations />
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default RecipeDetails;
