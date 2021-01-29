import React from 'react';
import PropTypes from 'prop-types';
import {
  CardDrinkRandon, CardFoodRandon, CategoryDrink, CategoryFood,
} from './CardsAndCategorys';

export default function RandonCards({ food, Drink, number }) {
  return (
    <div>
      {Drink && (
        <div>
          <CategoryDrink />
          {Array.from(
            { length: [number] }, (a, i) => <CardDrinkRandon key={ `Drink${i}` } />,
          )}
        </div>
      )}
      {food && (
        <div>
          <CategoryFood />
          {Array.from(
            { length: [number] }, (a, i) => <CardFoodRandon key={ `food${i}` } />,
          )}
        </div>
      )}
    </div>
  );
}

RandonCards.defaultProps = {
  food: true,
  Drink: true,
  number: 12,
};

RandonCards.propTypes = {
  food: PropTypes.bool,
  Drink: PropTypes.bool,
  number: PropTypes.number,
};
