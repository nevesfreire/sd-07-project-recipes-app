import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainDrinkCards({ thumb, title, index, id }) {
  return (
    <Link to={ `/bebidas/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumb }
          alt="Imagem do profile"
          data-testid={ `${index}-card-img` }
        />
        <div className="div" data-testid="page-div">
          <p data-testid={ `${index}-card-name` }>{title}</p>
        </div>
      </div>
    </Link>
  );
}

MainDrinkCards.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default MainDrinkCards;
