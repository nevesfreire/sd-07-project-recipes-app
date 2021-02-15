import {
  getAreas,
  request,
  failedRequest,
} from './actions';

import * as recipeAPI from '../../../services/recipeAPI';

export default function fetchAreas(type) {
  return async (dispatch) => {
    try {
      dispatch(request());
      const data = await recipeAPI.getAreas(type);
      dispatch(getAreas(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error.message));
    }
  };
}
