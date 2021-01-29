import React from 'react';
import PropTypes from 'prop-types';

function Cards({ card, context, index }) {
  const title = context === 'Comidas' ? card.strMeal : card.strDrink;
  const image = context === 'Comidas' ? card.strMealThumb : card.strDrinkThumb;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{title}</h3>
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt="Imagem da comida ou bebida"
        width="200"
      />
    </div>
  );
}

Cards.propTypes = {
  card: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Cards;
