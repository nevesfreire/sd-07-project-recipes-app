import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ card, context, index }) {
  const title = context === 'Comidas' ? card.strMeal : card.strDrink;
  const image = context === 'Comidas' ? card.strMealThumb : card.strDrinkThumb;
  const id = context === 'Comidas' ? card.idMeal : card.idDrink;
  const pageContext = context;

  return (
    <Link to={ `/${pageContext.toLowerCase()}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{title}</h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ image }
          alt="Imagem da comida ou bebida"
          width="200"
        />
      </div>
    </Link>
  );
}

Cards.propTypes = {
  card: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  context: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Cards;
