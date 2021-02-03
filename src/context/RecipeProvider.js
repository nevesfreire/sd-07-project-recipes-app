import React, { useState } from 'react';
import PropTypes from 'prop-types';
import geral from '../data';
import RecipeDetailsContext from './RecipeContext';

const RecipeProviderDetails = ({ children }) => {
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);
  const [state, setState] = useState(geral);

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setRecipeTitle = (value) => {
    const newRecipeTitle = state.detailRecipes;
    newRecipeTitle.detailsRecipe.recipeTitle = value;
    updateState('detailRecipes', newRecipeTitle);
  };

  const setRecipeImage = (value) => {
    const newRecipeImage = state.detailRecipes;
    newRecipeImage.detailsRecipe.recipeImage = value;
    updateState('detailRecipes', newRecipeImage);
  };

  const setRecipeArea = (value) => {
    const newRecipeArea = state.detailRecipes;
    newRecipeArea.detailsRecipe.recipeArea = value;
    updateState('detailRecipes', newRecipeArea);
  };

  const setRecipeAlc = (value) => {
    const newRecipeAlc = state.detailRecipes;
    newRecipeAlc.detailsRecipe.recipeAlc = value;
    updateState('detailRecipes', newRecipeAlc);
  };

  const setRecipeCategory = (value) => {
    const newRecipeCategory = state.detailRecipes;
    newRecipeCategory.detailsRecipe.recipeCategory = value;
    updateState('detailRecipes', newRecipeCategory);
  };

  const setRecipeIngredients = (value) => {
    const newRecipeIngredients = state.detailRecipes;
    newRecipeIngredients.detailsRecipe.recipeIngredients = value;
    updateState('detailRecipes', newRecipeIngredients);
  };

  const setRecipeInstructions = (value) => {
    const newRecipeInstructions = state.detailRecipes;
    newRecipeInstructions.detailsRecipe.recipeInstructions = value;
    updateState('detailRecipes', newRecipeInstructions);
  };

  const setRecipeVideo = (value) => {
    const newReciperecipeVideo = state.detailRecipes;
    newReciperecipeVideo.detailsRecipe.recipeVideo = value;
    updateState('detailRecipes', newReciperecipeVideo);
  };

  const setRecipeRecommendations = (value) => {
    const newRecipeRecommendations = state.detailRecipes;
    newRecipeRecommendations.detailsRecipe.recipeRecommendations = value;
    updateState('detailRecipes', newRecipeRecommendations);
  };

  const setRecipeTags = (value) => {
    const newRecipeTags = state.detailRecipes;
    newRecipeTags.detailsRecipe.recipeTags = value;
    updateState('detailRecipes', newRecipeTags);
  };

  return (
    <RecipeDetailsContext.Provider
      value={ {
        getRecipeTitle: state.detailRecipes.detailsRecipe.recipeTitle,
        getRecipeImage: state.detailRecipes.detailsRecipe.recipeImage,
        getRecipeArea: state.detailRecipes.detailsRecipe.recipeArea,
        getRecipeAlc: state.detailRecipes.detailsRecipe.recipeAlc,
        getRecipeCategory: state.detailRecipes.detailsRecipe.recipeCategory,
        getRecipeIngredients:
          state.detailRecipes.detailsRecipe.recipeIngredients,
        getRecipeInstructions:
          state.detailRecipes.detailsRecipe.recipeInstructions,
        getRecipeVideo: state.detailRecipes.detailsRecipe.recipeVideo,
        getRecipeRecommendations:
          state.detailRecipes.detailsRecipe.recipeRecommendations,
        getRecipeTags: state.detailRecipes.detailsRecipe.recipeTags,
        recipesDone,
        setRecipesDone,
        recipesInProgress,
        setRecipesInProgress,
        setRecipeTitle,
        setRecipeImage,
        setRecipeArea,
        setRecipeAlc,
        setRecipeCategory,
        setRecipeIngredients,
        setRecipeInstructions,
        setRecipeVideo,
        setRecipeRecommendations,
        setRecipeTags,
      } }
    >
      {children}
    </RecipeDetailsContext.Provider>
  );
};

export default RecipeProviderDetails;

RecipeProviderDetails.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;
