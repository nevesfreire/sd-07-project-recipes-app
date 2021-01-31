import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';
import detailRecipes from '../data/detailRecipes';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);
  const [state, setState] = useState(geral);
  const {
    initialState: { email, password },
    initialFoods: { dataFoods },
    initialDrinks: { dataDrinks },
    detailRecipes: {
        recipeId,
        recipeTitle,
        recipeImage,
        recipeArea,
        recipeAlc,
        recipeCategory,
        recipeIngredients,
        recipeInstructions,
        recipeVideo,
        recipeRecommendations,
        recipeTags,
    },
  } = state;

  const updateState = useCallback((key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(state.detailRecipes)
  }, [state])

  // const setRecipeId = (value) => {
  //   const newRecipeID = state.detailRecipes;
  //   newRecipeID.detailsRecipe.recipeId = value;
  //   updateState('detailRecipes', newRecipeID);
  // }

  const setRecipeTitle = (value) => {
    const newRecipeTitle = state.detailRecipes;
    newRecipeTitle.detailsRecipe.recipeTitle = value;
    updateState('detailRecipes', newRecipeTitle);
  }

  const setRecipeImage = (value) => {
    const newRecipeImage = state.detailRecipes;
    newRecipeImage.detailsRecipe.recipeImage = value;
    updateState('detailRecipes', newRecipeImage);
  }

  const setRecipeArea = (value) => {
    const newRecipeArea = state.detailRecipes;
    newRecipeArea.detailsRecipe.recipeArea = value;
    updateState('detailRecipes', newRecipeArea);
  }

  const setRecipeAlc = (value) => {
    const newRecipeAlc = state.detailRecipes;
    newRecipeAlc.detailsRecipe.recipeAlc = value;
    updateState('detailRecipes', newRecipeAlc);
  }

  const setRecipeCategory = (value) => {
    const newRecipeCategory = state.detailRecipes;
    newRecipeCategory.detailsRecipe.recipeCategory = value;
    updateState('detailRecipes', newRecipeCategory);
  }

  const setRecipeIngredients = (value) => {
    const newRecipeIngredients = state.detailRecipes;
    newRecipeIngredients.detailsRecipe.recipeIngredients = value;
    updateState('detailRecipes', newRecipeIngredients);
  }

  const setRecipeInstructions = (value) => {
    const newRecipeInstructions = state.detailRecipes;
    newRecipeInstructions.detailsRecipe.recipeInstructions = value;
    updateState('detailRecipes', newRecipeInstructions);
  }

  const setRecipeVideo = (value) => {
    const newReciperecipeVideo = state.detailRecipes;
    newReciperecipeVideo.detailsRecipe.recipeVideo = value;
    updateState('detailRecipes', newReciperecipeVideo);
  }

  const setRecipeRecommendations = (value) => {
    const newRecipeRecommendations = state.detailRecipes;
    newRecipeRecommendations.detailsRecipe.recipeRecommendations = value;
    updateState('detailRecipes', newRecipeRecommendations);
  }

  const setRecipeTags = (value) => {
    const newRecipeTags = state.detailRecipes;
    newRecipeTags.detailsRecipe.recipeTags = value;
    updateState('detailRecipes', newRecipeTags);
  }

  const history = useHistory();

  const redirect = (path) => {
    history.push({ pathname: path });
  };

  return (
    <GlobalContext.Provider
      value={{
        redirect,
        title,
        setTitle,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        dataFoods,
        dataDrinks,
        // getRecipeId: detailRecipes.detailsRecipe.recipeId,
        // setRecipeId,
        getRecipeTitle: detailRecipes.detailsRecipe.recipeTitle,
        setRecipeTitle,
        getRecipeImage: detailRecipes.detailsRecipe.recipeImage,
        setRecipeImage,
        getRecipeArea: detailRecipes.detailsRecipe.recipeArea,
        setRecipeArea,
        getRecipeAlc: detailRecipes.detailsRecipe.recipeAlc,
        setRecipeAlc,
        getRecipeCategory: detailRecipes.detailsRecipe.recipeCategory,
        setRecipeCategory,
        getRecipeIngredients: detailRecipes.detailsRecipe.recipeIngredients,
        setRecipeIngredients,
        getRecipeInstructions: detailRecipes.detailsRecipe.recipeInstructions,
        setRecipeInstructions,
        getRecipeVideo: detailRecipes.detailsRecipe.recipeVideo,
        setRecipeVideo,
        getRecipeRecommendations: detailRecipes.detailsRecipe.recipeRecommendations,
        setRecipeRecommendations,
        getRecipeTags: detailRecipes.detailsRecipe.recipeTags,
        setRecipeTags,
        searchTerm,
        setSearchTerm,
        recipesDone,
        setRecipesDone,
        recipesInProgress,
        setRecipesInProgress,
        setTitle,
        setDataFoods: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.dataFoods = value;
          updateState("initialFoods", newInitialFoods);
        },
        setDataDrinks: (value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.dataDrinks = value;
          updateState("initialDrinks", newInitialDrinks);
        },
        email,
        password,
        setEmail: (text) => {
          const newInitialEmail = state.initialState;
          newInitialEmail.email = text;
          updateState("email", newInitialEmail);
        },
        setPassword: (text) => {
          const newInititalPassword = state.initialState;
          newInititalPassword.password = text;
          updateState("password", newInititalPassword);
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
