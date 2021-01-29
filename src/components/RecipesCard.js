import React from 'react';
import PropTypes from 'prop-types';

class RecipesCard extends React.Component {
  render() {
    const { recipe, index, search } = this.props;
    const { strMealThumb, strMeal, strDrinkThumb, strDrink } = recipe;
    const maxNumber = 12;
    return (
      <div>
        {
          index < maxNumber && search === 'meals' ? (
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: 30 } }
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          ) : null
        }
        {
          index < maxNumber && search === 'drinks' ? (
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: 30 } }
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
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
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  search: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCard;
