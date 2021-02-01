import React from 'react';
import PropTypes from 'prop-types';

import { Ingredient, Recomendations, Video,
  ImageDetails, TitleDetails, Instructions } from './index';

function RecipeDetails({ recipes }) {
  return (
    <div className="div-recipes-details">
      <ImageDetails recipes={ recipes } />
      <TitleDetails recipes={ recipes } />
      <Ingredient recipes={ recipes } />
      <Instructions recipes={ recipes } />
      { recipes === 'comidas' ? <Video /> : ''}
      <Recomendations recipes={ recipes } />
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default RecipeDetails;
