export const EMAIL = 'EMAIL';
export const RECEIVED_RECIPES = 'RECEIVED_RECIPES';
export const ERROR = 'ERROR';
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES';

export const sendEmail = (email) => ({
  type: EMAIL,
  email,
});

const recievedRecipes = (payload) => ({
  type: RECEIVED_RECIPES,
  payload,
});

const recievedCategories = (payload) => ({
  type: RECEIVED_CATEGORIES,
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

export function fetchCategories(endPoint) {
  return async (dispatch) => {
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      dispatch(recievedCategories(data));
    } catch (error) {
      dispatch(errorFetch());
    }
  };
}
