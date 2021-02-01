import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function Card({ name, thumb, index, id, type }) {
  const { setTypeAndIdDetails } = useContext(RecipeContext);

  return (
    <Link to={ `/${type}/${id}` }>
      <div
        className="recipe-card"
        onKeyDown=""
        role="button"
        tabIndex="0"
        onClick={ () => setTypeAndIdDetails({
          type,
          id,
        }) }
        data-testid={ `${index}-recipe-card` }
      >
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
