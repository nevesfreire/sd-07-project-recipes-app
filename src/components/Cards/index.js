import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ recipe, index }) {
  const dataTestID = `${index}-recipe-card`;
  const dataTestIDImg = `${index}-card-img`;
  const dataTestIDCard = `${index}-card-name`;
  let url;
  let src;
  let name;
  if ('idMeal' in recipe) {
    url = `/comidas/${recipe.idMeal}`;
    src = recipe.strMealThumb;
    name = recipe.strMeal;
  } else if ('idDrink' in recipe) {
    url = `/bebidas/${recipe.idDrink}`;
    src = recipe.strDrinkThumb;
    name = recipe.strDrink;
  }

  return (
    <Link key={ index } to={ url }>
      <div className="recipe-card" data-testid={ dataTestID }>
        <img
          alt="Recipe Thumbnail"
          data-testid={ dataTestIDImg }
          src={ src }
          className="recipe-thumb"
          height="250"
        />
        <h2
          className="recipe-name"
          data-testid={ dataTestIDCard }
        >
          {name}
        </h2>
      </div>
    </Link>
  );
}
