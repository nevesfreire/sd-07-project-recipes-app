import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState([]);
  const [typeAndIdDetails, setTypeAndIdDetails] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [drinkStateButton, setDrinkStateButton] = useState(true);
  const [mealStateButton, setMealStateButton] = useState(true);
  const [drinkByIngredient, setDrinkByIngredient] = useState([]);
  const [mealByIngredient, setMealByIngredient] = useState([]);
  const [clickedButtonMeal, setClickedButtonMeal] = useState(false);
  const [clickedButtonDrink, setClickedButtonDrink] = useState(false);
  const [favoriteMeal, setFavoriteMeal] = useState(false);
  const [favoriteDrink, setFavoriteDrink] = useState(false);

  const context = {
    recipes,
    setRecipes,
    categoriesFood,
    setCategoriesFood,
    categoriesDrinks,
    setCategoriesDrinks,
    detailsRecipe,
    setDetailsRecipe,
    typeAndIdDetails,
    setTypeAndIdDetails,
    setRecomendations,
    recomendations,
    drinkStateButton,
    setDrinkStateButton,
    mealStateButton,
    setMealStateButton,
    drinkByIngredient,
    setDrinkByIngredient,
    mealByIngredient,
    setMealByIngredient,
    clickedButtonMeal,
    setClickedButtonMeal,
    clickedButtonDrink,
    setClickedButtonDrink,
    favoriteMeal,
    setFavoriteMeal,
    favoriteDrink,
    setFavoriteDrink,
  };

  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>);
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
