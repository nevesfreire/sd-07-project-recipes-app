import React from 'react';
import PropTypes from 'prop-types';

function Card({ name, thumb, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{ name }</p>
      <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default Card;
