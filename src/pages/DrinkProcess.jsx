import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/GlobalContext';
import RecipeDetailsContext from '../context/RecipeContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import ShowRecommended from '../components/RecommendedFoodOrDrinks';
import './foodAndDrinkDetails.css';
import {
  ingredientsMount,
  unLikeRecipe,
  setLikeImage,
  saveFavoriteRecipe,
} from '../components/func_details';

function DrinkProcess() {
  const contextGlobal = useContext(GlobalContext);
  const { setTitle } = contextGlobal;
  const context = useContext(RecipeDetailsContext);
  const [btnImg, setBtnImg] = useState('');
  const { 
    getRecipeTitle,
    setRecipeTitle,
    getRecipeImage,
    setRecipeImage,
    getRecipeArea,
    setRecipeArea,
    getRecipeCategory,
    setRecipeCategory,
    getRecipeIngredients,
    setRecipeIngredients,
    getRecipeInstructions,
    setRecipeInstructions,
    setRecipeTags,
    getRecipeTags,
     } = context;
  return(
    <h1>Olá eu sou receita em progresso Drink</h1>
  )
}

DrinkProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkProcess;
