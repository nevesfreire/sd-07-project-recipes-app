export const REQUEST_AREA = 'REQUEST_AREA';
export const REQUEST_AREA_FAILED = 'REQUEST_AREA_FAILED';
export const SELECT_AREA = 'SELECT_AREA';

export const requestArea = () => ({
  type: REQUEST_AREA,
});

export const requestAreaFailed = (error) => ({
  type: REQUEST_AREA_FAILED,
  error,
});
export const selectedArea = (meals) => ({
  type: SELECT_AREA,
  meals,
});
