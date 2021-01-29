import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FoodThumb({ detailed, route }) {
  let detailedImg;
  let detailedTitle;
  let category;

  if (route === 'comidas') {
    detailedImg = 'strMealThumb';
    detailedTitle = 'strMeal';
    category = 'strCategory';
  } else {
    detailedImg = 'strDrinkThumb';
    detailedTitle = 'strDrink';
    category = 'strAlcoholic';
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt=""
        src={ detailed[0][detailedImg] }
      />
      <h2
        data-testid="recipe-title"
      >
        { detailed[0][detailedTitle] }
      </h2>
      <button type="button" data-testid="share-btn">
        <img alt="" src={ shareIcon } />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img alt="" src={ whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">{ detailed[0][category] }</h4>
    </div>
  );
}

FoodThumb.propTypes = {
  detailed: propTypes.arrayOf(propTypes.object).isRequired,
  route: propTypes.string.isRequired,
};
