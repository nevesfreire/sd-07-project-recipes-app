export const EMAIL = 'EMAIL';
export const RECEIVED_RECIPES = 'RECEIVED_RECIPES';
export const ERROR = 'ERROR';
export const CHANGE_FETCH = 'CHANGE_FETCH';

export const changeFetching = () => ({
  type: CHANGE_FETCH,
});

export const sendEmail = (email) => ({
  type: EMAIL,
  email,
});

const recievedRecipes = (payload) => ({
  type: RECEIVED_RECIPES,
  payload,
});

const errorFetch = () => ({
  type: ERROR,
  error: 'deu ruim!',
});

export function fetchRecipes(endPoint) {
  return async (dispatch) => {
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      dispatch(recievedRecipes(data));
    } catch (error) {
      dispatch(errorFetch());
    }
  };
}
