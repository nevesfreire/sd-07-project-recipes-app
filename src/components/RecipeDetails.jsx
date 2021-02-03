import React from 'react';
import PropTypes from 'prop-types';

import {
  Ingredient, Recomendations, Video,
  ImageDetails, TitleDetails, Instructions, ButtonDetails,
} from './index';

function RecipeDetails({ recipes, id }) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const setTextBtn = () => {
    if (inProgressRecipes) {
      if (recipes === 'comidas') {
        const { meals } = inProgressRecipes;
        const ids = Object.keys(meals);
        return ids.find((key) => key === id);
      }
      const { cocktails } = inProgressRecipes;
      const ids = Object.keys(cocktails);
      return ids.find((key) => key === id);
    }
  };

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
      <ButtonDetails
        recipes={ recipes }
        id={ id }
        textBtn={ setTextBtn() ? 'Continuar Receita' : 'Iniciar Receita' }
        dataTestId="start-recipe-btn"
      />
    </div>
  );
}

RecipeDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;
