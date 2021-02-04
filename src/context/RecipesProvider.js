import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import * as foodApiFunctions from '../services/foodApiFunctions';

function RecipesProvider({ children }) {
  const zero = 0;
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [id, setId] = useState(zero);
  const [ingredients, setIngredients] = useState([]);
  const [foodsToRender, setFoodsToRender] = useState([]);
  const [drinksToRender, setDrinksToRender] = useState([]);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [pathName, setPathName] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [redirectByIngredients, setRedirectByIngredients] = useState(false);
  const [usedSearchBar, setUsedSearchBar] = useState(false);
  useEffect(() => {
    foodApiFunctions.fetchAllFoodRecipes().then((response) => setFoodData(response));
  }, []);
  useEffect(() => {
    drinkApiFunctions.fetchAllDrinkRecipes().then((response) => setDrinkData(response));
  }, []);
  useEffect(() => {
    setDrinksToRender(drinkData.drinks);
  }, [drinkData]);
  useEffect(() => {
    setFoodsToRender(foodData.meals);
  }, [foodData]);
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
  const fetchByIngredients = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByIngredient(value)
        .then((response) => setFoodsToRender(response.meals));
      setUsedSearchBar(true);
    } else {
      drinkApiFunctions
        .fetchDrinkByIngredient(value)
        .then((response) => setDrinksToRender(response.drinks));
      setUsedSearchBar(true);
    }
  };
  const fetchInIngredientCard = (ingredient, path) => {
    if (path === '/explorar/comidas/ingredientes') {
      foodApiFunctions
        .fetchFoodByIngredient(ingredient)
        .then((response) => setFoodsToRender(response.meals));
    } else {
      drinkApiFunctions
        .fetchDrinkByIngredient(ingredient)
        .then((response) => setDrinksToRender(response.drinks));
    }
    setRedirectByIngredients(true);
  };
  const fetchByName = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByName(value)
        .then((response) => setFoodsToRender(response.meals));
      setUsedSearchBar(true);
    } else {
      drinkApiFunctions
        .fetchDrinkByName(value)
        .then((response) => setDrinksToRender(response.drinks));
      setUsedSearchBar(true);
    }
  };
  const fetchByFirstLetter = (value) => {
    if (pathName === '/comidas') {
      foodApiFunctions
        .fetchFoodByFirstLetter(value)
        .then((response) => setFoodsToRender(response.meals));
      setUsedSearchBar(true);
    } else {
      drinkApiFunctions
        .fetchDrinkByFirstLetter(value)
        .then((response) => setDrinksToRender(response.drinks));
      setUsedSearchBar(true);
    }
  };

  const context = {
    login,
    setLogin,
    foodDetail,
    setFoodDetail,
    drinkDetail,
    setDrinkDetail,
    id,
    setId,
    ingredients,
    setIngredients,
    showSearchBar,
    toggleSearchBar,
    pathName,
    setPathName,
    foodsToRender,
    setFoodsToRender,
    drinksToRender,
    setDrinksToRender,
    fetchByIngredients,
    fetchByName,
    fetchByFirstLetter,
    foodData,
    drinkData,
    fetchInIngredientCard,
    setRedirectByIngredients,
    redirectByIngredients,
    setUsedSearchBar,
    usedSearchBar,
  };
  return (
    <div>
      <RecipesContext.Provider value={ context }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}
RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default RecipesProvider;
// import * as localStorageFunctions from '../services/localStorageFunctions';
// const doneRecipe1 = {
//   id: '52772',
//   type: 'comidas',
//   area: 'Japanese',
//   category: 'Chicken',
//   alcoholicOrNot: '',
//   name: 'Teriyaki Chicken Casserole',
//   image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
//   doneDate: '03-02-2021',
//   tags: ['Meat', 'Casserole'],
// };
// const doneRecipe2 = {
//   id: '11007',
//   type: 'bebidas',
//   area: '',
//   category: 'Ordinary Drink',
//   alcoholicOrNot: 'Alcoholic',
//   name: 'Margarita',
//   image:
//   'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
//   doneDate: '03-02-2021',
//   tags: ['IBA', 'ContemporaryClassic'],
// };
// useEffect(() => {
//   localStorageFunctions.putFavoriteRecipesLocalStorage(doneRecipe1);
//   localStorageFunctions.putFavoriteRecipesLocalStorage(doneRecipe2);
// });
