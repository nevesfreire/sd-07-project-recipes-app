import areasTypes from './types';

export function getAreas(areas) {
  return { type: areasTypes.GET_AREAS, payload: areas };
}

export function request() {
  return { type: areasTypes.REQUEST };
}

export function failedRequest(error) {
  return { type: areasTypes.FAILED_REQUEST, payload: error };
}
