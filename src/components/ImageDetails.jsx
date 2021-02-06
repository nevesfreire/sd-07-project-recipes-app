import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from '../context/FoodAppContext';

function ImageDetails({ recipes }) {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;

  if (recipes === 'comidas') {
    return (
      <div className="image-detail">
        {meals && meals.map(({ idMeal, strMealThumb }) => (
          <img
            data-testid="recipe-photo"
            className="images-details"
            src={ strMealThumb }
            alt="images-details"
            key={ idMeal }
          />
        ))}
      </div>
    );
  }
  return (
    <div className="image-detail">
      {drinks && drinks.map(({ idDrink, strDrinkThumb }) => (
        <img
          data-testid="recipe-photo"
          className="images-details"
          src={ strDrinkThumb }
          alt="images-details"
          key={ idDrink }
        />
      ))}
    </div>
  );
}

ImageDetails.propTypes = {
  recipes: PropTypes.string.isRequired,
};

export default ImageDetails;
