import React from 'react';
import PropTypes from 'prop-types';
import CardDrinkRandon from './CardDrinkRandon';

export default function RandonDrinkCards({ number }) {
  return (
    <div className="cards">
      {Array.from(
        { length: [number] }, (_, i) => (
          <CardDrinkRandon
            key={ `Drink${i}` }
            testidCard={ `${i}-recipe-card` }
            testidImg={ `${i}-card-img` }
            testidTitle={ `${i}-card-name` }
          />
        ),
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
