import React from 'react';
import PropTypes from 'prop-types';
import CardFoodRandon from './CardFoodRandon';

export default function RandonFoodCards({ number }) {
  return (
    <div className="cards">
      {Array.from(
        { length: [number] }, (a, i) => <CardFoodRandon key={ `food${i}` } />,
      )}
    </div>
  );
}

RandonFoodCards.defaultProps = {
  number: 12,
};

RandonFoodCards.propTypes = {
  number: PropTypes.number,
};
