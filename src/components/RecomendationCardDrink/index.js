import React from 'react';
import PropTypes from 'prop-types';

class RecomendationCardMeal extends React.Component {
  render() {
    const { mealRecommended, mealIndex } = this.props;
    console.log(1);
    return (
      <div
        data-testid={ `${mealIndex}-recomendation-card` }
      >
        <h3 data-testid={ `${mealIndex}-recomendation-title` }>
          {mealRecommended.strMeal}
        </h3>
        <h4>{mealRecommended.strCategory}</h4>
        <img
          src={ mealRecommended.strMealThumb }
          alt={ mealRecommended.strMeal }
        />
      </div>
    );
  }
}

RecomendationCardMeal.propTypes = {
  mealRecommended: PropTypes.arrayOf(PropTypes.Object).isRequired,
  mealIndex: PropTypes.number.isRequired,
};

export default RecomendationCardMeal;
