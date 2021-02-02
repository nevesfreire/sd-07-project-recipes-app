import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to={ `${pathname}/${id}` } />;
  }

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => setShouldRedirect(true) }
    >
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
    </button>
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
