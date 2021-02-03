// import {
//   REQUEST_AREA,
//   REQUEST_AREA_FAILED,
//   SELECT_AREA,
// } from '../actions';

// const INITIAL_STATE = {
//   area: [],
//   error: false,
//   isFetching: true,
// };

// const areaReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case REQUEST_AREA:
//     return {
//       ...state,
//       isFetching: true,
//     };
//   case REQUEST_AREA_FAILED:
//     return { ...state, error: true };
//   case SELECT_AREA:
//     return {
//       ...state,
//       area: action.area,
//       isFetching: false,
//     };
//   default:
//     return state;
//   }
// };

// export default areaReducer;
