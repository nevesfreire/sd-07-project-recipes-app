import recomendationsTypes from './types';

export function getRecomendations(recipes) {
  return { type: recomendationsTypes.GET_RECOMENDATIONS, payload: recipes };
}

export function request() {
  return { type: recomendationsTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: recomendationsTypes.FAILED_REQUEST, payload: error };
}
