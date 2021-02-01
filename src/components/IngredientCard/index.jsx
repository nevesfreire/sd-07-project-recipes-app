import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function IngredientCard({
  id,
  ingredient,
  redirectToFoodPage,
  redirectToDrinkPage,
}) {
  const { location: { pathname } } = useHistory();
  console.log(pathname);

  const ingredientSelected = async () => {
    if (pathname === '/explorar/comidas/ingredientes') {
      await redirectToFoodPage(ingredient.strIngredient);
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      await redirectToDrinkPage(ingredient.strIngredient1);
    }
  };

  return (
    <button
      type="button"
      className="ingredient-card"
      data-testid={ `${id}-ingredient-card` }
      onClick={ ingredientSelected }
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
    </button>
  );
}

IngredientCard.propTypes = {
  id: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
  redirectToFoodPage: PropTypes.func.isRequired,
  redirectToDrinkPage: PropTypes.func.isRequired,
};
