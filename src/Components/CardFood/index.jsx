import React from 'react';
import PropTypes from 'prop-types';

const CardFood = (props) => {
  const { thumb, foodName, index } = props;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ foodName } />
      <p data-testid={ `${index}-card-name` }>{foodName}</p>
    </div>
  );
};

export default CardFood;

CardFood.propTypes = {
  thumb: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
