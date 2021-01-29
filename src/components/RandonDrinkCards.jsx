import React from 'react';
import PropTypes from 'prop-types';
import { CardDrinkRandon, CategoryDrink } from './CardsAndCategorys';

export default function RandonDrinkCards({ number }) {
  return (
    <div>
      <CategoryDrink />
      {Array.from(
        { length: [number] }, (_, i) => <CardDrinkRandon key={ `Drink${i}` } />,
      )}
    </div>
  );
}

RandonDrinkCards.defaultProps = {
  number: 12,
};

RandonDrinkCards.propTypes = {
  number: PropTypes.number,
};
