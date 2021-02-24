import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../contextAPI/context';
import RenderdrinkCardDetail from '../helpers/RenderDrinkDetail';
import radioData from '../data/helperParam';

function DrinkDetails(props) {
  let array;
  const { radio } = radioData;

  const { data: { beverage,
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient } } = useContext(context);

  const { drinks: drinksByName } = filterByName;
  const { drinks: drinksByIngredient } = filterByIngredient;
  const { drinks } = beverage;
  array = drinks;

  if (drinksByIngredient || drinksByName || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      array = drinksByIngredient;
      break;
    case radio.byName:
      array = drinksByName;
      break;
    case radio.firstChar:
      array = filterByFirstchar;
      break;
    default:
      array = drinks;
    }
  }

  const { drinkPath } = props;
  const { location: { pathname } } = drinkPath;
  const pathString = pathname.split('/');
  const drinkId = pathString[2];

  return (
    <div className="card-container">
      {
        RenderdrinkCardDetail(array, drinkId)
      }
    </div>
  );
}

DrinkDetails.propTypes = {
  drinkPath: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetails;
