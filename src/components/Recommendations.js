import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

function Recommendations({ api }) {
  const startPosition = 0;
  const lastPosition = 6;
  const firstSixItems = api.slice(startPosition, lastPosition);

  return (
    <div>
      <Slider
        dots
        infinite
        speed={ 1000 }
        slidesToScroll={ 1 }
        arrows
        slidesToShow={ 2 }
      >
        { firstSixItems.map((card, index) => {
          if (card.strDrink) {
            return (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img src={ card.strDrinkThumb } width="100px" alt="Cocktail" />
                <h5>{ card.strCategory }</h5>
                <h4>{ card.strDrink }</h4>
              </div>
            );
          }
          return (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ card.strMealThumb } width="100px" alt="Meal" />
              <h5>{ card.strCategory }</h5>
              <h4>{ card.strMeal }</h4>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

Recommendations.propTypes = {
  api: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recommendations;
