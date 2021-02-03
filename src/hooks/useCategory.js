import { useContext, useState } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import { categoryMealApi, categoryDrinkApi, mealsAPI, drinksAPI } from '../services';

function useCategory(history) {
  const cinco = 5;
  const zero = 0;
  const bools = true;
  const {
    setMealsData,
    setDrinksData,
    showSearch,
  } = useContext(FoodAppContext);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { location } = history;
  const { pathname } = location;
  const category = pathname.split('/');

  async function fecthCategoryMeals() {
    const { meals } = await categoryMealApi();
    setMealsCategory(meals);
  }

  async function fecthCategoryDrinks() {
    const { drinks } = await categoryDrinkApi();
    setDrinksCategory(drinks);
  }

  const fetchCategory = category[1] === 'comidas' ? fecthCategoryMeals
    : fecthCategoryDrinks;

  const handlerCategoryMeals = async ({ target }) => {
    setToggle(false);
    const term = toggle ? '' : target.value;
    const { meals } = await mealsAPI(term, 'c');
    setMealsData(meals);
    setToggle(true);
  };

  const handlerCategoryAllMeals = async () => {
    const { meals } = await mealsAPI('', '');
    setMealsData(meals);
  };

  const handlerCategoryAllDrinks = async () => {
    const { drinks } = await drinksAPI('', '');
    setDrinksData(drinks);
  };

  const handlerCategoryDrinks = async ({ target }) => {
    setToggle(false);
    const term = toggle ? '' : target.value;
    const { drinks } = await drinksAPI(term, 'c');
    setDrinksData(drinks);
    setToggle(true);
  };

  return [cinco, zero, bools, category, showSearch, mealsCategory,
    drinksCategory, setToggle, fetchCategory, handlerCategoryMeals,
    handlerCategoryAllMeals, handlerCategoryAllDrinks,
    handlerCategoryDrinks];
}

export default useCategory;
