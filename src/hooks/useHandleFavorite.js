import React, { useContext } from 'react';
import RecipeContext from '../Context/Context';

const useHandleFavorite = () => {
  const {
    clickedButtonMeal,
    setClickedButtonMeal,
    clickedButtonDrink,
    setClickedButtonDrink,
    favoriteMeal, setFavoriteMeal,
    favoriteDrink, setFavoriteDrink, detailsRecipe } = useContext(RecipeContext);

  function mealDidMount(currentRecipe) {
    console.log('entrou');
    console.log(currentRecipe);
    if (localStorage.getItem('favoriteRecipes') !== null
      && clickedButtonMeal === false && favoriteMeal === false) {
      const favoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteLS.filter((recipe) => {
        if (recipe.name === currentRecipe.name) {
          setFavoriteMeal(true);
        }
        return null;
      });
    }
  }

  function drinkDidMount(currentRecipe) {
    if (localStorage.getItem('favoriteRecipes') !== null
      && clickedButtonDrink === false && favoriteDrink === false) {
      const favoriteLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteLS.filter((recipe) => {
        if (recipe.name === currentRecipe.name) {
          setFavoriteDrink(true);
        }
        return null;
      });
    }
  }

  function handleFavFood() {
    setClickedButtonMeal(true);
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailsRecipe.meals[0];
    const newRecipe = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    console.log(newRecipe);
    if (favoriteMeal === false) {
      setFavoriteMeal(true);
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
      } else {
        const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const newFavoriteList = [
          ...favoriteLocalStorage,
          newRecipe,
        ];
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(newFavoriteList),
        );
      }
    }
    if (favoriteMeal === true) {
      setFavoriteMeal(false);
      const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newListFavorite = favoriteLocalStorage
        .filter((recipe) => recipe.name !== newRecipe.name);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
    }
  }

  function handleFavDrink() {
    setClickedButtonDrink(true);
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = detailsRecipe.drinks[0];
    const newRecipe = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favoriteDrink === false) {
      setFavoriteDrink(true);
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
      } else {
        const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        console.log('favLS', favoriteLocalStorage);
        const newFavoriteList = {
          ...favoriteLocalStorage,
          ...newRecipe,
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([newFavoriteList]),
        );
      }
    }
    if (favoriteDrink === true) {
      setFavoriteDrink(false);
      const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newListFavorite = favoriteLocalStorage
        .filter((recipe) => recipe.name !== newRecipe.name);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newListFavorite));
    }
  }

  return { handleFavFood, mealDidMount, handleFavDrink, drinkDidMount };
};

export default useHandleFavorite;
