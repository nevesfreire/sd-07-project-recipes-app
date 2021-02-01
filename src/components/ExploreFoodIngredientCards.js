import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function ExploreFoodIngredientICards({ title, index }) {
  return (
    <button type="button" onClick={ () => console.log('funciona') }>
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          src={ `https://www.themealdb.com/images/ingredients/${title}.png` }
          alt="Imagem do profile"
          data-testid={ `${index}-card-img` }
        />
        <div className="div" data-testid="page-div">
          <p data-testid={ `${index}-card-name` }>{title}</p>
        </div>
      </div>
    </button>
  );
}

ExploreFoodIngredientICards.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ExploreFoodIngredientICards;
