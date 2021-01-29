import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ name, thumb, index, id, type }) {
  return (
    <Link to={ `/${type}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ name }</p>
        <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
      </div>

    </Link>

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
