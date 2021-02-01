import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RecipesCard extends React.Component {
  render() {
    const { recipe, index, search } = this.props;
    const { strMealThumb, strMeal, idMeal, strDrinkThumb, strDrink, idDrink } = recipe;
    return (
      <div className="recipe-card">
        {
          search === 'meals' ? (
            <Link data-testid={ `${index}-recipe-card` } to={ `/comidas/${idMeal}` }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </Link>
          ) : null
        }
        {
          search === 'drinks' ? (
            <Link data-testid={ `${index}-recipe-card` } to={ `/bebidas/${idDrink}` }>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </Link>
          ) : null
        }
      </div>
    );
  }
}

RecipesCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    idMeal: PropTypes.number,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    idDrink: PropTypes.number,
  }).isRequired,
  search: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCard;
