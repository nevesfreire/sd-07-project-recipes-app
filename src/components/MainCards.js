import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

function MainCards({ thumb, title, key, index, id }) {
  return (
    <Link to={`/comidas/${id}`}>
    <div key={ key } data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumb }
          alt="Imagem do profile"
          data-testid={ `${index}-card-img` }
        />
      <div
        className="div"
        data-testid="page-div"
      >
        <p data-testid={ `${index}-card-name` }>
          { title }
        </p>
      </div>
    </div>
    </Link>
  );
}

MainCards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainCards;
