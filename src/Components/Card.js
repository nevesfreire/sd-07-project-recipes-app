import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './style/Card.css';

function Card(props) {
  const {
    item,
    index,
    isFood,
    isFoodIngredient,
    isDrinkIngredient,
  } = props;

  if (isFoodIngredient) {
    return (
      <Link
        to={ `/explorar/comidas/ingredientes/${item.strIngredient}` }
      >
        <div
          key={ index }
          className="ingredient-card"
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="Ingredient"
          />
          <Button
            variant="light"
            data-testid={ `${index}-card-name` }
          >
            {item.strIngredient}
          </Button>
        </div>
      </Link>
    );
  }
  if (isDrinkIngredient) {
    const nameIngredient = item.strIngredient1.replace(
      / /g, '_',
    );
    return (
      <Link
        to={
          `/explorar/bebidas/ingredientes/${nameIngredient}`
        }
      >
        <div
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          className="ingredient-card"
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="Ingredient"
          />
          <Button
            variant="light"
            data-testid={ `${index}-card-name` }
          >
            {item.strIngredient1}
          </Button>
        </div>
      </Link>
    );
  }
  return (
    isFood
      ? (
        <Link to={ `/comidas/${item.idMeal}` } className="card-container">
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <img
              src={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt="Meal"
              style={ { margin: '15px', width: '80%', borderRadius: '15px' } }
            />
            <Button
              data-testid={ `${index}-card-name` }
              variant="info"
              style={ { width: '80%' } }
            >
              {item.strMeal}
            </Button>
          </div>
        </Link>
      )
      : (
        <Link to={ `/bebidas/${item.idDrink}` } className="card-container">
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <img
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt="Drink"
              style={ { margin: '15px', width: '80%', borderRadius: '15px' } }
            />
            <Button
              data-testid={ `${index}-card-name` }
              variant="info"
              style={ { width: '80%' } }
            >
              {item.strDrink}
            </Button>
          </div>
        </Link>
      )
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
  isFoodIngredient: PropTypes.bool.isRequired,
  isDrinkIngredient: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strIngredient: PropTypes.string.isRequired,
    strIngredient1: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
