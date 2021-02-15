import {
  getRecomendations,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export default function fetchRecomendations(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getRecipes(type);
      dispatch(getRecomendations(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
