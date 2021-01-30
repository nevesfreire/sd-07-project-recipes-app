import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';

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

  const setRecipeId = (value) => {
    const newRecipeID = state.recipe;
    newRecipeID.recipeId = value;
    updateState('recipe', newRecipeID);
  }

  const setRecipeTitle = (value) => {
    const newRecipeTitle = state.recipe;
    newRecipeTitle.recipeTitle = value;
    updateState('recipe', newRecipeTitle);
  }

  const setRecipeImage = (value) => {
    const newRecipeImage = state.recipe;
    newRecipeImage.recipeImage = value;
    updateState('recipe', newRecipeImage);
  }

  const setRecipeArea = (value) => {
    const newRecipeArea = state.recipe;
    newRecipeArea.recipeArea = value;
    updateState('recipe', newRecipeArea);
  }

  const setRecipeAlc = (value) => {
    const newRecipeAlc = state.recipe;
    newRecipeAlc.recipeAlc = value;
    updateState('recipe', newRecipeAlc);
  }

  const setRecipeCategory = (value) => {
    const newRecipeCategory = state.recipe;
    newRecipeCategory.recipeCategory = value;
    updateState('recipe', newRecipeCategory);
  }

  const setRecipeIngredients = (value) => {
    const newRecipeIngredients = state.recipe;
    newRecipeIngredients.recipeIngredients = value;
    updateState('recipe', newRecipeIngredients);
  }

  const setRecipeInstructions = (value) => {
    const newRecipeInstructions = state.recipe;
    newRecipeInstructions.recipeInstructions = value;
    updateState('recipe', newRecipeInstructions);
  }

  const setRecipeVideo = (value) => {
    const newReciperecipeVideo = state.recipe;
    newReciperecipeVideo.recipeVideo = value;
    updateState('recipe', newReciperecipeVideo);
  }

  const setRecipeRecommendations = (value) => {
    const newRecipeRecommendations = state.recipe;
    newRecipeRecommendations.recipeRecommendations = value;
    updateState('recipe', newRecipeRecommendations);
  }

  const setRecipeTags = (value) => {
    const newRecipeTags = state.recipe;
    newRecipeTags.recipeTags = value;
    updateState('recipe', newRecipeTags);
  }

  const recipeObject = {
    recipeId,
    setRecipeId,
    recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeArea,
    setRecipeArea,
    recipeAlc,
    setRecipeAlc,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeVideo,
    setRecipeVideo,
    recipeRecommendations,
    setRecipeRecommendations,
    recipeTags,
    setRecipeTags,
    searchTerm,
    setSearchTerm,
    recipesDone,
    setRecipesDone,
    recipesInProgress,
    setRecipesInProgress,
  };

  function updateState(key, value) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  const history = useHistory();

  const redirect = (path) => {
    history.push({ pathname: path });
  };

  return (
    <GlobalContext.Provider
      value={ {
        redirect,
        title,
        setTitle,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        dataFoods,
        dataDrinks,
        recipeObject,
        setDataFoods: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.dataFoods = value;
          updateState('initialFoods', newInitialFoods);
        },
        setDataDrinks: (value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.dataDrinks = value;
          updateState('initialDrinks', newInitialDrinks);
        },
        email,
        password,
        setEmail: (text) => {
          const newInitialEmail = state.initialState;
          newInitialEmail.email = text;
          updateState('email', newInitialEmail);
        },
        setPassword: (text) => {
          const newInititalPassword = state.initialState;
          newInititalPassword.password = text;
          updateState('password', newInititalPassword);
        },
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
