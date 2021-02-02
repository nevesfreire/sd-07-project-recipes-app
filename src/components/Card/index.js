import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({
  data: {
    id,
    name,
    img,
  },
  index,
  pathname,
}) {
  return (
    <article data-testid={ `${index}-recipe-card` }>
      <header>
        <img
          data-testid={ `${index}-card-img` }
          alt="thumbnail"
          src={ img }
          width="100px"
        />
      </header>
      <main>
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </main>
      <Link to={ `${pathname}/${id}` }>
        Detalhes
      </Link>
    </article>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Card;
