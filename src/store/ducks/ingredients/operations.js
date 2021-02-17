import {
  getIngredients,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export default function fetchIngredients(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getIngredientList(type);
      dispatch(getIngredients(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
