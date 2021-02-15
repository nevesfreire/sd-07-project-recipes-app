import {
  getRecipes,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export default function fetchRecipesByFilter(
  pathType,
  filterType = recipeAPI.FILTER_TYPES.NAME,
  filterTerm = '',
) {
  return async (dispatch) => {
    try {
      dispatch(request());
      let data;
      switch (filterType) {
      case recipeAPI.FILTER_TYPES.CATEGORY:
        data = await recipeAPI.getRecipesByCategory(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.INGREDIENT:
        data = await recipeAPI.getRecipesByIngredient(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.FIRST_LETTER:
        data = await recipeAPI.getRecipesByFirstLetter(pathType, filterTerm);
        break;
      case recipeAPI.FILTER_TYPES.AREA:
        console.log('pendente filtrar por area');
        break;
      case recipeAPI.FILTER_TYPES.NAME:
        data = await recipeAPI.getRecipesByName(pathType, filterTerm);
        break;
      default:
        data = await recipeAPI.getRecipes(pathType);
      }
      dispatch(getRecipes(data));
    } catch (error) {
      console.log('fetchRecipesByFilter: ', pathType, filterType, filterTerm);
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
