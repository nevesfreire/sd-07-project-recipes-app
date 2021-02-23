import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../contextAPI/context';
import radioData from '../data/helperParam';
import RenderFoodCardDetail from '../helpers/renderFoodCardDetail';

function FoodDetails(props) {
  let array;
  const { radio } = radioData;

  const { data: { food,
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient } } = useContext(context);
  console.log('estou em fooddetail', filterByIngredient);
  const { meals: mealsByName } = filterByName;
  const { meals: mealsByIngredient } = filterByIngredient;
  const { meals } = food;
  array = meals;

  if (mealsByIngredient || mealsByName || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      array = mealsByIngredient;
      break;
    case radio.byName:
      array = mealsByName;
      break;
    case radio.firstChar:
      array = filterByFirstchar;
      break;
    default:
      array = meals;
    }
  }

  const { foodPath } = props;
  const { location: { pathname } } = foodPath;
  const pathString = pathname.split('/');
  const idFood = pathString[2];

  return (
    <div className="card-container">
      {
        RenderFoodCardDetail(array, idFood)
      }
    </div>
  );
}

FoodDetails.propTypes = {
  foodPath: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodDetails;
