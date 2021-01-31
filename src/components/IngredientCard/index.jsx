import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function IngredientCard({ id, ingredient }) {
  const { location: { pathname } } = useHistory();
  console.log(pathname);

  return (
    <Link to="/">
      <div
        className="ingredient-card"
        data-testid={ `${id}-ingredient-card` }
      >
        <img
          alt="ingredient"
          src={
            (pathname === '/explorar/comidas/ingredientes') ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`
          }
          data-testid={ `${id}-card-img` }
        />
        <p data-testid={ `${id}-card-name` }>
          {
            (ingredient.strIngredient ? ingredient.strIngredient
              : ingredient.strIngredient1)
          }
        </p>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  id: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
};
