import React from 'react';
import { connect } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodThumb({ meals }) {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt=""
        src={ meals[0].strMealThumb }
      />
      <h2
        data-testid="recipe-title"
      >
        { meals[0].strMeal }
      </h2>
      <button type="button" data-testid="share-btn">
        <img alt="" src={ shareIcon } />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img alt="" src={ whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">{ meals[0].strCategory }</h4>
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
});

export default connect(mapStateToProps)(FoodThumb);
