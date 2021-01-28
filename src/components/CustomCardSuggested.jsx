import React from 'react';
import PropTypes from 'prop-types';

export default function CustomCardSuggested({ thumb, index, title }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
      <img src={ thumb } alt="" />
    </div>
  );
}

CustomCardSuggested.propTypes = {
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
