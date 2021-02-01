import React from 'react';
import PropTypes from 'prop-types';

export default function RecomedendationCard({ data, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        alt="imagem"
        src={ data.strMealThumb }
      />
      <p>{ data.strAlcoholic }</p>
      <h3 data-testid={ `${index}-recomendation-title` }>{ data.strMeal }</h3>

    </div>
  );
}

RecomedendationCard.propTypes = {
  data: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
