import React from 'react';
import PropTypes from 'prop-types';

export default function RecomedendationCard({ data, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        alt="imagem"
        src={ data.strDrinkThumb }
      />
      <p>{ data.strAlcoholic }</p>
      <h3 data-testid={ `${index}-recomendation-title` }>{ data.strDrink }</h3>

    </div>
  );
}

RecomedendationCard.propTypes = {
  data: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
