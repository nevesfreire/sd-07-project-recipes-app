import React from 'react';
import PropTypes from 'prop-types';

class RecomendationCardDrink extends React.Component {
  render() {
    const { drinkRecommended, drinkIndex } = this.props;
    return (
      <div
        data-testid={ `${drinkIndex}-recomendation-card` }
      >
        <h3 data-testid={ `${drinkIndex}-recomendation-title` }>
          {drinkRecommended.strDrink}
        </h3>
        <h4>{drinkRecommended.strCategory}</h4>
        <img
          src={ drinkRecommended.strDrinkThumb }
          alt={ drinkRecommended.strDrink }
        />
      </div>
    );
  }
}

RecomendationCardDrink.propTypes = {
  drinkRecommended: PropTypes.arrayOf(PropTypes.Object).isRequired,
  drinkIndex: PropTypes.number.isRequired,
};

export default RecomendationCardDrink;
