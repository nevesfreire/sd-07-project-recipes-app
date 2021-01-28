export const EMAIL = 'EMAIL';
export const RECEIVED_RECIPES = 'RECEIVED_RECIPES';
export const ERROR = 'ERROR';
export const SEARCH_INPUT = 'SEARCH_INPUT'

export const sendSearchInput = (value) => ({
  type: SEARCH_INPUT,
  value,
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
