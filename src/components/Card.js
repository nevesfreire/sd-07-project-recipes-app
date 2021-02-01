import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

function Card({ name, thumb, index, id, type }) {
  const { recipeDetailsAPI } = useFetch();

  return (
    <div
      className="recipe-card"
      onKeyDown={ () => recipeDetailsAPI(id, type) }
      role="button"
      tabIndex="0"
      onClick={ () => recipeDetailsAPI(id, type) }
      data-testid={ `${index}-recipe-card` }
    >
      <p data-testid={ `${index}-card-name` }>{ name }</p>
      <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
    </div>

  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
