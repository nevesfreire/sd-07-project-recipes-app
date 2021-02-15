import {
  getCategories,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export default function fetchCategories(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getCategories(type);
      dispatch(getCategories(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
