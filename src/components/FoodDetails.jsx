// import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import context from '../contextAPI/context';
// import radioData from '../data/helperParam';
// import RenderFoodCardDetail from '../helpers/renderFoodCardDetail';
// import { set } from 'lodash';

// function FoodDetails(props) {
//   let array;
//   const { radio } = radioData;

//   const { state, setState } = useContext(context);
//   const { data,
//     radioBtn,
//     filterByName,
//     filterByFirstchar,
//     filterByIngredient } = state;
//   console.log('estou em fooddetail', filterByIngredient);
// const { data: { food,
//   radioBtn,
//   filterByName,
//   filterByFirstchar,
//   filterByIngredient } } = useContext(context);
// console.log('estou recebendo food', food);
// console.log('estou em fooddetail', filterByIngredient);
// const { meals: mealsByName } = filterByName;
// const { meals: mealsByIngredient } = filterByIngredient;
// const { meals } = food;
// array = meals;

//   if (filterByIngredient || filterByName || filterByFirstchar) {
//     switch (radioBtn) {
//     case radio.ingredient:
//       array = filterByIngredient.meals;
//       break;
//     case radio.byName:
//       array = filterByName.meals;
//       break;
//     case radio.firstChar:
//       array = filterByFirstchar.meals;
//       break;
//     default:
//       array = food;
//     }
//   }
//   // const { foodPath } = props;
//   // const { location: { pathname } } = foodPath;
//   // const pathString = pathname.split('/');
//   // const idFood = pathString[2];

//   // return (
//   //   <div className="card-container">
//   //     {
//   //       RenderFoodCardDetail(array, idFood)
//   //     }
//   //   </div>
//   // );
// }

// // FoodDetails.propTypes = {
// //   foodPath: PropTypes.objectOf(PropTypes.any).isRequired,
// // };

// export default FoodDetails;
