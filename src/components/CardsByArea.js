import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';

function CardsByArea({ recipe, index, handleClick, showDetails }) {
  return (
    <div>
      <button
        type="button"
        onClick={ () => showDetails(recipe.idMeal) }
        data-testid={ `${index}-recipe-card` }
      >
        <p data-testid={ `${index}-card-name` }>
          Nome:
          { recipe.strMeal }
        </p>
        <Link
          to={ `/comidas/${recipe.idMeal}` }
          onClick={ () => handleClick(recipe.idMeal) }
        >
          <img
            data-testid={ `${index}-card-img` }
            width="200px"
            alt="receitas"
            src={ recipe.strMealThumb }
          />
        </Link>
      </button>
    </div>
  );
}

CardsByArea.propTypes = {
  recipe: PropTypes.objectOf(string).isRequired,
  index: PropTypes.number.isRequired,
  showDetails: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardsByArea;
