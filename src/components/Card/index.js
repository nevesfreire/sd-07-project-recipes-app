import React from 'react';
import PropTypes from 'prop-types';

function Card({
  data: {
    name,
    img,
  },
  index,
}) {
  return (
    <article data-testid={ `${index}-recipe-card` }>
      <header>
        <img
          data-testid={ `${index}-card-img` }
          alt="thumbnail"
          src={ img }
        />
      </header>
      <main>
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </main>
    </article>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
