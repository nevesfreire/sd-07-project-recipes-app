import React from 'react';
import PropTypes from 'prop-types';

function Item({ index, name, imageSrc, handleOnClick }) {
  return (
    <button
      type="button"
      name={ name }
      onClick={ handleOnClick }
      data-testid={ `${index}-ingredient-card` }
      className="div-meals"
    >
      <img
        src={ imageSrc }
        name={ name }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p name={ name } data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

Item.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default Item;
