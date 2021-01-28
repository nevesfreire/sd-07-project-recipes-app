import {
  requestDrinkRecipes,
  listDrinkRecipes,
  failedDrinkRequest,
  drinkFilteredByCategoryAction,
} from '../redux/actions';

const getDrinkRecipes = ({ searchInput, searchRadio }) => {
  let endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
  if (searchRadio === 's' || searchRadio === 'f') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
  }
  return async (dispatch) => {
    dispatch(requestDrinkRecipes());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(listDrinkRecipes(data));
    } catch (error) {
      dispatch(failedDrinkRequest(error));
    }
  };
};

export const drinksFilteredByCategory = (category) => {
  const drinkUrlForFilterByCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

  return async (dispatch) => {
    dispatch(requestDrinkRecipes());
    try {
      const resquestFilteredByCategory = await fetch(drinkUrlForFilterByCategory);
      const JSONresponseFiltered = await resquestFilteredByCategory.json();
      console.log(JSONresponseFiltered.drinks);
      dispatch(drinkFilteredByCategoryAction(JSONresponseFiltered.drinks));
    } catch (error) {
      dispatch(failedDrinkRequest(error));
    }
  };
};

// const drinksFilteredByCategory = () => {
//   const drinksUrlForFIlterByCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

//   if (category.title === 'Bebidas') {
//     const resquestFilteredByCategory = await fetch(drinksUrlForFIlterByCategory);
//     const JSONResquestFilteredByCategory = await resquestFilteredByCategory.json();
//     console.log(JSONResquestFilteredByCategory);
//   }
// }

export default getDrinkRecipes;
