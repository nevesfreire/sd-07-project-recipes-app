import React from 'react';
import PropTypes from 'prop-types';

import {
  Ingredient, Recomendations, Video,
  ImageDetails, TitleDetails, Instructions, ButtonDetails,
} from './index';

function RecipeDetails({ recipes, id }) {
  return (
    <div className="div-recipes-details">
      <ImageDetails recipes={ recipes } />
      <TitleDetails
        recipes={ recipes }
        pathname={ `http://localhost:3000/${recipes}/${id}` }
        id={ id }
      />
      <Ingredient recipes={ recipes } />
      <Instructions recipes={ recipes } />
      { recipes === 'comidas' ? <Video /> : ''}
      <Recomendations recipes={ recipes } />
      <ButtonDetails recipes={ recipes } id={ id } />
    </div>
  );
}

RecipeDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;
