import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';

function ImageDetails({ recipes }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  if (recipes === 'comidas') {
    return (
      <div>
        {meals && meals.map(({ idMeal, strMealThumb }) => (
          <div key={ idMeal }>
            <img
              className="images-details"
              src={ strMealThumb }
              alt="images-details"
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {drinks && drinks.map(({ idDrink, strDrinkThumb }) => (
        <div key={ idDrink }>
          <img
            className="images-details"
            src={ strDrinkThumb }
            alt="images-details"
          />
        </div>
      ))}
    </div>
  );
}

ImageDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default ImageDetails;
